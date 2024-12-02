// [src/useMeta.js](src/useMeta.js)
import { useContext } from "react";
import MetaContext from "./MetaContext";

const useMeta = (meta) => {
  const metaContext = useContext(MetaContext);

  if (metaContext) {
    // SSR: Collect metadata synchronously during rendering
    Object.assign(metaContext, meta);
  } else {
    // Client-side: Update document head when component renders
    if (meta.title) document.title = meta.title;

    if (meta.description) {
      let metaTag = document.querySelector('meta[name="description"]');
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = "description";
        document.head.appendChild(metaTag);
      }
      metaTag.content = meta.description;
    }

    // Handle other meta tags similarly if needed
  }
};

export default useMeta;
