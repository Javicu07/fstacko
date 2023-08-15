import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";

//import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const App = (props) => {
  const [state, setState] = useState(12);

  /*
  const counter = useState(13);
  const state = counter[0];
  const setState = counter[1];
  */

  const handleClick = () => {
    setState(state + 1);
  };

  const handleClickReset = () => {
    setState(0);
  };

  return (
    <div>
      <p>El valor del contador es:</p>
      <h1>{state}</h1>
      <button onClick={handleClick}>Incrementar</button>
      <button onClick={handleClickReset}>Reset</button>
    </div>
  );
};

let counter = 0;

root.render(
  <StrictMode>
    <App counterInit={counter} />
  </StrictMode>
);