cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cd .next/standalone
HOSTNAME=127.0.0.1 node server.js
