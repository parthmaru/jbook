import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import React, { useEffect, createRef } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CellList from "./components/CellList";
import Pdf from "react-to-pdf";

const ref = createRef();
const options = {
  orientation: "landscape",
  unit: "in",
  format: [15, 10],
};

const App = () => {
  const initialize = async () => {
    await esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.11.18/esbuild.wasm",
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Provider store={store}>
      <Pdf targetRef={ref} filename="code-doc.pdf" options={options}>
        {({ toPdf }) => (
          <button
            className="button button-format is-link is-small"
            onClick={toPdf}
          >
            Save Document
          </button>
        )}
      </Pdf>
      <div ref={ref}>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
