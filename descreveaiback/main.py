from flask import Flask
from openAIGen import openai_bp
from geminiGen import genai_bp
from PIL import Image


app = Flask(__name__)

# Route for Gemini
app.register_blueprint(genai_bp, url_prefix='/gemini')
# Route for OpenAI
app.register_blueprint(openai_bp, url_prefix='/openai')

@app.route('/')
def home():
    return 'Hello, Flask!'

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000, debug=True)