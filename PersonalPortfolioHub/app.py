import os
import logging
from flask import Flask, render_template

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

@app.route('/')
def index():
    """Render the main portfolio page"""
    return render_template('index.html')

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('index.html'), 500

# 🛑 IMPORTANT! Correct main block
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

