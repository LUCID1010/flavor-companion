from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend requests

@app.route('/')
def home():
    return jsonify({"message": "Backend working!"})

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    # logic here for food recommendation
    return jsonify({"recommendations": ["Pizza", "Sushi", "Biryani"]})

if __name__ == '__main__':
    app.run(debug=True)
