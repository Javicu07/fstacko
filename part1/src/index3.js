import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./styles.css";

//import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const WarningNotUsed = () => {
  return <h1>Todavía no se ha usado el contador</h1>;
};

const ListOfClicks = ({ clicks }) => {
  return <p>{clicks.join(", ")}</p>;
};

const App = () => {
  //const [left, setLeft] = useState(0);
  //const [right, setRight] = useState(0);

  const [counters, setCounters] = useState({
    left: 0,
    right: 0,
    message: "Mensaje en el estado"
  });

  const [clicks, setClicks] = useState([]);

  const handleClickLeft = () => {
    const newCounterState = {
      ...counters,
      left: counters.left + 1
    };
    setCounters(newCounterState);
    setClicks((prevClicks) => [...prevClicks, "L"]);
  };

  const handleClickRight = () => {
    const newCounterState = {
      ...counters,
      right: counters.right + 1
    };
    setCounters(newCounterState);
    setClicks((prevClicks) => [...prevClicks, "R"]);
  };

  const handleReset = () => {
    setCounters({
      left: 0,
      right: 0,
      message: "Mensaje en el estado"
    });
    setClicks([]);
  };

  return (
    <div>
      {counters.left}
      <button onClick={handleClickLeft}>left</button>
      <button onClick={handleClickRight}>right</button>
      {counters.right}
      <p>
        <button onClick={handleReset}>Reset</button>
      </p>
      <p>Clicks totales generados: {clicks.length}</p>
      {clicks.length === 0 ? (
        <WarningNotUsed />
      ) : (
        <ListOfClicks clicks={clicks} />
      )}
      <p>{counters.message}</p>
    </div>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);