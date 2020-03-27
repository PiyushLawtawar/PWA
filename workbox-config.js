module.exports = {
  "globDirectory": "src/static/",
  "globPatterns": [
    "**/*.css"
  ],
  "swDest": "public/service-worker.js",
  "swSrc": "src/workbox.js",
  modifyURLPrefix: {
    'css': 'src/static/css',
    'fonts':'src/static/fonts',
    'images':'src/static/images'
  }
};
