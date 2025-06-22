from app.db.connection import get_db_connection

def get_or_create_user(clerk_user_id, email, name):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT id FROM users WHERE clerk_user_id = %s;", (clerk_user_id,))
    row = cur.fetchone()

    if row:
        user_id = row[0]
    else:
        cur.execute(
            "INSERT INTO users (clerk_user_id, email, name) VALUES (%s, %s, %s) RETURNING id;",
            (clerk_user_id, email, name)
        )
        user_id = cur.fetchone()[0]
        conn.commit()

    cur.close()
    conn.close()
    return user_id
