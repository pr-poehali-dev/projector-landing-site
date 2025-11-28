'''
Business: API для отправки отзывов участников в базу данных
Args: event с httpMethod и body (name, text, rating)
Returns: JSON с результатом добавления отзыва
'''

import json
import os
from typing import Dict, Any
import psycopg2

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    conn.autocommit = False
    return conn

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    name = body_data.get('name', '').strip()
    text = body_data.get('text', '').strip()
    rating = body_data.get('rating', 5)
    
    if not name or not text:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Name and text are required'}),
            'isBase64Encoded': False
        }
    
    if not isinstance(rating, int) or rating < 1 or rating > 5:
        rating = 5
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        'INSERT INTO reviews (name, text, rating, approved) VALUES (%s, %s, %s, %s) RETURNING id',
        (name, text, rating, False)
    )
    
    review_id = cursor.fetchone()[0]
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': 'Отзыв успешно отправлен на модерацию',
            'id': review_id
        }, ensure_ascii=False),
        'isBase64Encoded': False
    }