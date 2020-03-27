# Frontend_Codebase
# PWA project boilerplate consisting service worker implementation using Google Workbox and HAPI js server with Redux configuration

It also has environment specific configuration set up which can be found in ecosystem.config.js
Enabled with PM2 for easy build process.

Steps to run server in localbox

1. npm install
2. npm run dev
3. Hit the url http://localhost:3000 in browser


Steps to run server in Dev Environment

1. npm install
2. npm run build
3. npm run start
4. Hit the url http://DEV-ENV-IP:PORT in browser

Steps to run server in SIT Environment:

1. npm install
2. npm run build
3. npm run pm2:sit
3. Hit the url http://SIT-ENV-IP:PORT in browser

Steps to run server in QA Environment:

1. npm install
2. npm run build
3. npm run pm2:qa
3. Hit the url http://QA-ENV-IP:PORT in browser
