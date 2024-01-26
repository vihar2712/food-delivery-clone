// import User from "./User";
import { Component } from "react";
import UserClass from "./UserClass";

// const About = () => {
//   return (
//     <div>
//       <h1>About us page</h1>
//       {/* <User name="Vihar Shah - function" location="Ahmedabad - function" age="45-function"/> */}
//       <UserClass name="Vihar Shah - class" location="Ahmedabad - class" age="45-class"/>
//     </div>
//   );
// };

class AboutClass extends Component {
  constructor(props) {
    super(props);
    console.log("Parent Constructor");
  }
  componentDidMount() {
    console.log("Parent component didMount");
  }
  render() {
    console.log("Parent Rendered");

    return (
      <div>
        <h1>About us page</h1>
        {/* <User name="Vihar Shah - function" location="Ahmedabad - function" age="45-function"/> */}
        <UserClass name="First" location="Ahmedabad - class" age="45-class" />
        <UserClass name="Second" location="Ahmedabad - class" age="45-class" />
        <UserClass name="Third" location="Ahmedabad - class" age="45-class" />
        <UserClass name="Fourth" location="Ahmedabad - class" age="45-class" />
      </div>
    );
  }
}

// export default About;
export default AboutClass;
