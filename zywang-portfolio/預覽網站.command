#!/bin/bash
# 雙擊這個檔案，就能在自己電腦上預覽網站（YouTube 影片可以直接在頁面播放）
# 看完後把這個終端機視窗關掉即可
cd "$(dirname "$0")"
PORT=8000
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT+1)); done
echo "網站預覽中：http://localhost:$PORT"
echo "看完後關掉這個視窗就好。"
(sleep 1 && open "http://localhost:$PORT") &
python3 -m http.server $PORT >/dev/null 2>&1
