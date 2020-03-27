const fs = require('fs');
const path = require('path');
const Hapi = require('hapi');

const paths = require('../config/paths');

const PORT = 3000;
const HOST = 'localhost';

const server = Hapi.server({
  port: PORT,
  host: HOST ,
  routes: {
    files: {
      relativeTo: paths.BUILD_DIR
    }
  }
});

server.route([{
  method: 'GET',
  path: '/',
  handler: function (req, res) {
    return res.file('index.html');
  }
}, {
  method: 'GET',
  path: '/{filename}.{ext}', // Will server static files from BUILD directory
  handler: function (req, res) {
    if (fs.existsSync(path.join(paths.BUILD_DIR, `${req.params.filename}.${req.params.ext}`))) {
      return res.file(`${req.params.filename}.${req.params.ext}`);
    }

    return 'Not Found'; // TODO: Need to handle when the requested assets file is not present
  }
}, {
  method: 'GET',
  path: '/{any*}',
  handler: async function (req, res) {
    let html = await new Promise((resolve, reject) => {
      const Renderer = require('./middleware/renderer').default;
      const configureStore = require('../src/store/configureStore').default;
      const store = configureStore({});
      const reqRoute = req.params.any;

      return Renderer(store)(reqRoute, (err, html) => {
        if (err) {
          return reject(err);
        }

        return resolve(html);
      });
    });

    return html
  }
}]);

/**
 * Register plugin and start server
 */
async function init() {
  try {
    await server.register(require('inert'));
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (error) {
    console.error(error);
  }
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
