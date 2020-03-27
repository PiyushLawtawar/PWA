const GeneratePage = (mainjs, vendorjs, css, html) => {
  // To Do: add CDN URL for assets
  const CDNURL = "";
  const scripts = [`<script defer type="text/javascript" src="${CDNURL}${mainjs}"></script>`];
  const scriptsLink = [`<link rel="preload" href="${CDNURL}${mainjs}" as="script">`];

  if (vendorjs) {
    scripts.unshift(`<script defer type="text/javascript" src="${CDNURL}${vendorjs}"></script>`);
    scriptsLink.unshift(`<link rel="preload" href="${CDNURL}${vendorjs}" as="script">`);
  }

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content=""/>
    <title>PWA Demo</title>
    <link href="${CDNURL}${css}" rel="stylesheet">
    ${scriptsLink.join('')}
  </head>
  <body>
    <div id="app">${html}</div>
    ${scripts.join('')}
  </body>
</html>
  `;
}

export default GeneratePage;
