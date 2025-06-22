from app.db.connection import get_db_connection

def insert_upload(user_id, filename):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO uploads (user_id, filename) VALUES (%s, %s) RETURNING id;",
        (user_id, filename)
    )
    upload_id = cur.fetchone()[0]
    conn.commit()

    cur.close()
    conn.close()
    return upload_id

def insert_chat_log(upload_id, question, answer):
    conn = get_db_connection()
    cur = conn.cursor()

    
    cur.execute(
        "INSERT INTO chat_logs (upload_id, question, answer) VALUES (%s, %s, %s);",
        (upload_id, question, answer)
    )
    conn.commit()
    cur.close()
    conn.close()


def fetch_uploads_for_user(user_id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, filename, upload_time
        FROM uploads
        WHERE user_id = %s
        ORDER BY upload_time DESC;
    """, (user_id,))
    rows = cur.fetchall()

    cur.close()
    conn.close()

    uploads = []
    for row in rows:
        uploads.append({
            'upload_id': row[0],
            'filename': row[1],
            'upload_time': row[2].isoformat()  # use upload_time here
        })
    return uploads


def fetch_chat_logs_for_upload(upload_id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT question, answer, asked_at
        FROM chat_logs
        WHERE upload_id = %s
        ORDER BY asked_at ASC;
    """, (upload_id,))
    rows = cur.fetchall()

    cur.close()
    conn.close()

    chatlog = []
    for row in rows:
        chatlog.append({
            'question': row[0],
            'answer': row[1],
            'asked_at': row[2].isoformat()
        })
    return chatlog


