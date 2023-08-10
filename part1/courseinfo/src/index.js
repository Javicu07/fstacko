import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import { useState } from "react";
import "./styles.css";

//import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const Header = (props) => {
  console.log(props);
  return <h3>{props.course}</h3>;
};

const Part = ({ part }) => {
  return (
    <>
      <h3>{part.name}</h3>
      <p>{part.exercises}</p>
    </>
  );
};

const Content = ({ parts }) => {
  return parts.map((part, index) => {
    return <Part key={index} part={part} />;
  });
};

const TotalExercises = ({ parts }) => {
  const totalExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );
  return <h5>Total of Exercises: {totalExercises}</h5>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ];

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <TotalExercises parts={parts} />
    </>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
