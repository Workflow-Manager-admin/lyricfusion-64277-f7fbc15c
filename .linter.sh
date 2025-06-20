#!/bin/bash
cd /home/kavia/workspace/code-generation/lyricfusion-64277-f7fbc15c/lyricfusion
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

