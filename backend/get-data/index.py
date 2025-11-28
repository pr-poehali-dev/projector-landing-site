'''
Business: API для получения данных из базы (категории, галерея, отзывы)
Args: event с httpMethod и queryStringParameters
Returns: JSON с данными из БД
'''

import json
import os
from typing import Dict, Any, List
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    data_type = params.get('type', 'categories')
    
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    result: List[Dict] = []
    
    if data_type == 'categories':
        cursor.execute('SELECT id, title, image_url, description FROM t_p39906907_projector_landing_si.categories ORDER BY id')
        result = [dict(row) for row in cursor.fetchall()]
    
    elif data_type == 'gallery':
        cursor.execute('SELECT id, image_url, title, description FROM t_p39906907_projector_landing_si.gallery ORDER BY id')
        result = [dict(row) for row in cursor.fetchall()]
    
    elif data_type == 'reviews':
        cursor.execute('SELECT id, name, text, rating FROM t_p39906907_projector_landing_si.reviews WHERE approved = true ORDER BY created_at DESC')
        result = [dict(row) for row in cursor.fetchall()]
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(result, ensure_ascii=False),
        'isBase64Encoded': False
    }