import fs from "node:fs/promises";
import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";

const isProduction = process.env.NODE_ENV === "production";
const Port = process.env.PORT || 3000;
const Base = process.env.BASE || "/";

const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

const app = express();
let vite;

// ? Add vite or respective production middlewares
if (!isProduction) {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);
} else {
  const sirv = (await import("sirv")).default;
  const compression = (await import("compression")).default;
  app.use(compression());
  app.use(
    Base,
    sirv("./dist/client", {
      extensions: [],
      gzip: true,
    })
  );
}

// ? Add Your Custom Routers & Middlewares heare
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api", (req, res) => {
  res.json({ message: "Hello World" });
});
const ssrRoutes = ["/"]; // Replace with your SSR routes

// ? SSR Render - Rendering Middleware

app.get("*", async (req, res, next) => {
  console.log("Incoming request:", req.path);

  if (req.path === "/favicon.ico") {
    return res.sendFile(path.resolve("./public/vite.svg"));
  }

  if (ssrRoutes.includes(req.path)) {
    // SSR rendering for specified routes
    try {
      let template, render;
      if (!isProduction) {
        template = await fs.readFile("./index.html", "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
        render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
      } else {
        template = templateHtml;
        render = (await import("./dist/server/entry-server.js")).render;
      }

      const { appHtml, meta } = await render({ path: req.originalUrl });

      const html = template
        .replace("<!--app-html-->", appHtml)
        .replace("<!--page-title-->", meta.title || "")
        .replace("<!--page-description-->", meta.description || "");

      res.status(200).setHeader("Content-Type", "text/html").end(html);
    } catch (error) {
      if (!isProduction) vite.ssrFixStacktrace(error);
      next(error);
    }
  } else {
    // CSR handling for other routes
    try {
      let template;
      if (!isProduction) {
        template = await fs.readFile("./index.html", "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
      } else {
        template = templateHtml;
      }

      // Replace placeholders with defaults in CSR routes
      template = template
        .replace("<!--page-title-->", "My App")
        .replace("<!--page-description-->", "Welcome to my app.");

      res.status(200).setHeader("Content-Type", "text/html").end(template);
    } catch (error) {
      if (!isProduction) vite.ssrFixStacktrace(error);
      next(error);
    }
  }
});

// ? Start http server
app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});
