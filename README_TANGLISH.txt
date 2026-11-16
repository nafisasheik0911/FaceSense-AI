FACESENSE AI - FACIAL EXPRESSION DETECTION
=========================================

IMPORTANT
---------
This is a student demo that estimates visible facial expressions. It cannot know
a person's true feelings. Results may be inaccurate. Ask for consent before
using another person's camera image. The app does not save frames intentionally.

REQUIREMENTS
------------
1. Windows 10/11
2. Python 3.10 or 3.11 (64-bit recommended)
3. Internet for first-time Python package installation
4. Webcam
5. Google Chrome or Microsoft Edge

HOW TO RUN (EASY METHOD)
------------------------
1. Extract this ZIP file.
2. Open the extracted AI-Facial-Emotion-Detection folder.
3. Double-click run_windows.bat.
4. Wait. First installation can take several minutes and downloads large AI
   packages/models.
5. When the terminal says the Flask server is running, open:
   http://127.0.0.1:5000
6. Press "Start camera" and allow camera permission.

HOW TO RUN FROM VS CODE
-----------------------
1. Open this folder in VS Code.
2. Open Terminal > New Terminal.
3. Run:
   py -m venv .venv
   .venv\\Scripts\\activate
   python -m pip install --upgrade pip
   pip install -r requirements.txt
   python app.py
4. Open http://127.0.0.1:5000 in your browser.

FILES
-----
app.py                 Python Flask server + DeepFace emotion analysis
templates/index.html   Website structure
static/style.css       Website design
static/script.js       Webcam and live updates
requirements.txt       Python packages
run_windows.bat        Windows setup and run helper

TROUBLESHOOTING
---------------
- If 'py' is not recognized, install Python from python.org and select
  "Add Python to PATH".
- If package installation fails, use Python 3.10 or 3.11 64-bit.
- Camera permission is required. Open the site using localhost URL above,
  not by double-clicking the HTML file.
- Close Zoom/Meet/Camera app if it is already using the webcam.
- First AI analysis can take longer while the model initializes.
- If the app shows an AI error, copy the terminal error message for support.

PRIVACY & RESPONSIBLE USE
-------------------------
Camera frames are processed by the local Python server. This starter project
does not write camera frames to disk. Do not use it to judge, rank, monitor,
or make decisions about people. Facial-expression predictions are uncertain
and are not evidence of a person's internal emotional state.
