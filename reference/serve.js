const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname);
const port = process.env.PORT || 8080;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8"
};

function injectHideAccessButtons(html) {
  const hideScript = `<script>(function(){
    function shouldHideText(text){
      var normalized = (text || "").replace(/\s+/g, " ").trim().toLowerCase();
      return normalized === "hr access" || normalized === "sign in" || normalized === "sign in / sign up";
    }
    function isInHeader(el){
      return !!el.closest("header,nav,[role='navigation'],.navbar,.site-header,.main-header");
    }
    function hideTargets(root){
      var nodes = root.querySelectorAll("a,button");
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (isInHeader(el) && shouldHideText(el.textContent)) {
          el.hidden = true;
          el.setAttribute("aria-hidden", "true");
          el.style.setProperty("display", "none", "important");
        }
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function(){ hideTargets(document); });
    } else {
      hideTargets(document);
    }
    var observer = new MutationObserver(function(){ hideTargets(document); });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  })();</script>`;

  if (html.includes("</head>")) {
    return html.replace("</head>", hideScript + "</head>");
  }

  return hideScript + html;
}

function resolveFilePath(reqPath, callback) {
  const basePath = path.join(root, reqPath);

  if (!basePath.startsWith(root)) {
    return callback(new Error("forbidden"));
  }

  fs.stat(basePath, (baseErr, baseStat) => {
    if (!baseErr && baseStat.isDirectory()) {
      const indexPath = path.join(basePath, "index.html");
      return fs.stat(indexPath, (indexErr, indexStat) => {
        if (!indexErr && indexStat.isFile()) return callback(null, indexPath);
        callback(new Error("notfound"));
      });
    }

    if (!baseErr && baseStat.isFile()) {
      return callback(null, basePath);
    }

    // Fallback for extensionless routes that map to HTML files.
    if (!path.extname(basePath)) {
      const htmlPath = basePath + ".html";
      return fs.stat(htmlPath, (htmlErr, htmlStat) => {
        if (!htmlErr && htmlStat.isFile()) return callback(null, htmlPath);
        callback(new Error("notfound"));
      });
    }

    callback(new Error("notfound"));
  });
}

http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split("?")[0]);
  if (reqPath === "/") reqPath = "/index.html";

  resolveFilePath(reqPath, (resolveErr, filePath) => {
    if (resolveErr) {
      if (resolveErr.message === "forbidden") {
        res.writeHead(403);
        return res.end("Forbidden");
      }
      res.writeHead(404);
      return res.end("Not found");
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(404);
        return res.end("Not found");
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = mime[ext] || (!ext ? mime[".html"] : "application/octet-stream");
      res.setHeader("Content-Type", contentType);

      if ((contentType || "").toLowerCase().startsWith("text/html")) {
        const html = data.toString("utf8");
        return res.end(injectHideAccessButtons(html));
      }

      res.end(data);
    });
  });
}).listen(port, () => {
  console.log("Serving on http://localhost:" + port);
});