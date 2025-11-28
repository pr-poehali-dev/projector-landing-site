import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с отзывами участников
    Args: event - dict с httpMethod, body
          context - object с request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    try:
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            name = body_data.get('name')
            rating = body_data.get('rating')
            review_text = body_data.get('reviewText')
            
            cursor.execute(
                "INSERT INTO reviews (name, rating, review_text) VALUES (%s, %s, %s) RETURNING id",
                (name, rating, review_text)
            )
            review_id = cursor.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': review_id, 'message': 'Review created'}),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            cursor.execute(
                "SELECT id, name, rating, review_text, created_at FROM reviews ORDER BY created_at DESC LIMIT 20"
            )
            rows = cursor.fetchall()
            
            reviews = []
            for row in rows:
                reviews.append({
                    'id': row[0],
                    'name': row[1],
                    'rating': row[2],
                    'reviewText': row[3],
                    'createdAt': row[4].isoformat() if row[4] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(reviews),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
