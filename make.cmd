set NODE_ENV=production
mkdir lib
cpx ".\components\**\*.scss" .\lib && babel src --out-dir lib
