import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с заявками на конкурс
    Args: event - dict с httpMethod, body, queryStringParameters
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
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
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
            
            full_name = body_data.get('fullName')
            phone = body_data.get('phone')
            age = body_data.get('age')
            contests = body_data.get('contests', [])
            photo_url = body_data.get('photoUrl')
            music_url = body_data.get('musicUrl')
            
            cursor.execute(
                "INSERT INTO applications (full_name, phone, age, contests, photo_url, music_url) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
                (full_name, phone, age, contests, photo_url, music_url)
            )
            application_id = cursor.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': application_id, 'message': 'Application created'}),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            headers = event.get('headers', {})
            admin_token = headers.get('X-Admin-Token') or headers.get('x-admin-token')
            
            if admin_token != 'admin123':
                return {
                    'statusCode': 401,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Unauthorized'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "SELECT id, full_name, phone, age, contests, photo_url, music_url, created_at FROM applications ORDER BY created_at DESC"
            )
            rows = cursor.fetchall()
            
            applications = []
            for row in rows:
                applications.append({
                    'id': row[0],
                    'fullName': row[1],
                    'phone': row[2],
                    'age': row[3],
                    'contests': row[4],
                    'photoUrl': row[5],
                    'musicUrl': row[6],
                    'createdAt': row[7].isoformat() if row[7] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(applications),
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
