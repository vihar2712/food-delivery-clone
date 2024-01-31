// import User from "./User";
import { Component } from "react";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

// Functional Component
// const About = () => {
//   return (
//     <div>
//       <h1>About us page</h1>
//       {/* <User name="Vihar Shah - function" location="Ahmedabad - function" age="45-function"/> */}
//       <UserClass name="Vihar Shah - class" location="Ahmedabad - class" age="45-class"/>
//     </div>
//   );
// };

// Class based component
class AboutClass extends Component {
  constructor(props) {
    super(props);
    // console.log("Parent Constructor");
  }
  componentDidMount() {
    // console.log("Parent component didMount");
  }
  render() {
    // console.log("Parent Rendered");

    return (
      <div>
        <h1>About us page</h1>
        <UserContext.Consumer>
          {({ loggedInUser,loginTime }) => <h1>Hello {loggedInUser}  at {loginTime}</h1>}
        </UserContext.Consumer>
        {/* <User name="Vihar Shah - function" location="Ahmedabad - function" age="45-function"/> */}
        <UserClass name="First" location="Ahmedabad - class" age="45-class" />
        {/* <UserClass name="Second" location="Ahmedabad - class" age="45-class" /> */}
      </div>
    );
  }
}

// export default About;
export default AboutClass;
