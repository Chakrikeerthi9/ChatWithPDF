import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from app.db.connection import get_db_connection

try:
    conn = get_db_connection()
    print("Connected to the database")
    conn.close()
except Exception as e:
    print("Error connecting to the database:", e)