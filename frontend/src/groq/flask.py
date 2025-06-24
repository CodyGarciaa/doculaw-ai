from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
import tempfile

# 👇 Import your existing logic here
from uploadPDF import summarize_pdf  # your function that does everything

app = Flask(__name__)
CORS(app)  # Allow TS frontend to access this

@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    pdf_file = request.files['file']

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        pdf_path = tmp.name
        pdf_file.save(pdf_path)

    try:
        summary = summarize_pdf(pdf_path)  # returns dict of section summaries
        return jsonify({'summary': summary})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(pdf_path)

if __name__ == '__main__':
    app.run(debug=True, port=5000)