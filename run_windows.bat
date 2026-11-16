@echo off
title FaceSense AI - Setup
echo Creating Python virtual environment...
py -m venv .venv
call .venv\Scripts\activate
echo Installing required libraries. This may take several minutes...
python -m pip install --upgrade pip
pip install -r requirements.txt
echo.
echo Setup complete. Starting FaceSense AI...
python app.py
pause
