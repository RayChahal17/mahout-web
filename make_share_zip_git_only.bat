@echo off
cd /d "%~dp0"
git archive -o mahout-web-src.zip HEAD
echo SUCCESS: Upload "mahout-web-src.zip"
pause