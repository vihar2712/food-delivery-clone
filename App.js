import React from 'react';
import ReactDOM from 'react-dom/client';

const heading = React.createElement(
  "h1",
  { style: { backgroundColor: "red" }, id: "heading" },
  "Hello World from React"
);
console.log(heading); // it is an object

const root = ReactDOM.createRoot(document.getElementById("root"));

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I an an H1 tag"),
    React.createElement("h2", {}, "I an an H2 tag"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I an an H1 tag"),
    React.createElement("h2", {}, "I an an H2 tag"),
  ]),
]);
// root.render(heading);
root.render(parent);
