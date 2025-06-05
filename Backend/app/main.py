from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)  # Launches Flask server on http://localhost:5000
