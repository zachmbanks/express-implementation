const express = require("express");
const htm = require("htm");
const vhtml = require("vhtml");
const html = htm.bind(vhtml);

//create an express application object:
const server = express();
server.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);

server.use("/node_modules", express.static("node_modules"));

server.use((req, res, next) => {
  res.final = view => res.send(RootHTML({ view: view }));
  next();
});

server.get("/", (req, res) => {
  const view = () => html`
    <ons-page id="start">
      <h1>Home Page</h1>
      <p>Hello,</p>
      <a href="/page2" up-dash>Page 2</a>
    </ons-page>
  `;

  res.final(view);
});

server.get("/page2", (req, res) => {
  const view = () => html`
    <ons-page id="page2">
      <h1>Page 2</h1>
      <p>Hello,</p>
      <a href="/" up-dash>Home Page</a>
    </ons-page>
  `;

  res.final(view);
});

server.listen(process.env.PORT);

function RootHTML({ view }) {
  return (
    `<!DOCTYPE html lang="en-US">` +
    html`
      <html>
        <head>
          <title>AEHQ</title>
          <meta charset="UTF-8" />
          <link
            rel="stylesheet"
            href="/node_modules/unpoly/dist/unpoly.min.css"
          />
          <link
            rel="stylesheet"
            href="/node_modules/onsenui/css/onsenui.min.css"
          />
          <link
            rel="stylesheet"
            href="/node_modules/onsenui/css/onsen-css-components.min.css"
          />
          <script src="/node_modules/unpoly/dist/unpoly.min.js"></script>
          <script src="/node_modules/onsenui/js/onsenui.min.js"></script>
        </head>

        <body>
          <${view} />
        </body>
      </html>
    `
  );
}
