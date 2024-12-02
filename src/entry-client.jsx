// [src/entry-client.jsx](src/entry-client.jsx)
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import MetaContext from "./MetaContext";

const container = document.getElementById("app");

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <BrowserRouter>
      <MetaContext.Provider value={null}>
        <Router />
      </MetaContext.Provider>
    </BrowserRouter>
  );
} else {
  ReactDOM.createRoot(container).render(
    <BrowserRouter>
      <MetaContext.Provider value={null}>
        <Router />
      </MetaContext.Provider>
    </BrowserRouter>
  );
}
