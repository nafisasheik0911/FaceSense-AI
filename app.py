from flask import Flask, render_template, request, jsonify
from deepface import DeepFace
import base64
import cv2
import numpy as np

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        payload = request.get_json(silent=True) or {}
        image_data = payload.get("image", "")
        if "," in image_data:
            image_data = image_data.split(",", 1)[1]
        if not image_data:
            return jsonify({"error": "No camera image received."}), 400

        raw = base64.b64decode(image_data)
        arr = np.frombuffer(raw, dtype=np.uint8)
        frame = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        if frame is None:
            return jsonify({"error": "Could not read the camera image."}), 400

        result = DeepFace.analyze(
            img_path=frame,
            actions=["emotion"],
            enforce_detection=False,
            detector_backend="opencv"
        )
        if isinstance(result, list):
            result = result[0]

        scores = result.get("emotion", {})
        dominant = result.get("dominant_emotion", "unknown")
        return jsonify({
            "emotion": dominant.title(),
            "scores": {k.title(): round(float(v), 1) for k, v in scores.items()}
        })
    except Exception as exc:
        return jsonify({"error": f"AI analysis failed: {str(exc)[:220]}"}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
