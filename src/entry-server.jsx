// [src/entry-server.jsx](src/entry-server.jsx)
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Router } from "./router";
import MetaContext from "./MetaContext";

export const render = ({ path }) => {
  const meta = {};

  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={path}>
      <MetaContext.Provider value={meta}>
        <Router />
      </MetaContext.Provider>
    </StaticRouter>
  );

  return { appHtml, meta };
};
