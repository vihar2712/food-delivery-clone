import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement(
    "h1",
    { style: { backgroundColor: "red" }, id: "heading" },
    "Hello World from React"
  );
  console.log(heading); // it is an object
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  const jsxHeading = <h1>Namaste React from JSX</h1>;
  console.log(jsxHeading);
  
  // React Functional Component
  
  const HeadingComponent = () => <h1>Heading using React Component 🚀</h1>;
  
  // Component composition -> component inside component
  
  const Footer = () => <h3>Footer element 🔥!!!! </h3>;
  // const extra = <div><Container/></div>
  const Container = () => {
    return (
      <div className="container">
        {title}
        <HeadingComponent />
        <h2>Another small heading 🔥</h2>
        {Footer()}
        <Desc />
      </div>
    );
  };
  console.log(Container);
  
  const title = <h2>Title element🔥 </h2>;
  // const title = <h4>small heading using JSX {footer} </h4>;
  // const footer = <h4>{Container()}</h4>
  // const title = <h4>small heading using JSX {<Container/>}</h4>; // goes into infinite loop
  
  // root.render(heading);
  // root.render(jsxHeading);
  // root.render(<HeadingComponent/>);
  
  const header = <h1>Header</h1>;
  // JSX inside functional component
  const Desc = () => (
    <div>
      {header}
      <h2>Description</h2>
      {end}
      {/* <Container/> */}
    </div>
  );
  // JSX inside functional component
  const end = <h1>The END</h1>;
  // root.render(<Desc />);
  
  root.render(<Container />);