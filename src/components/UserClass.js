import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };
    // console.log(this.props.name + " Child Constructor");

    // console.log(this.state);
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/akshaymarch7");
    const jsonData = await data.json();
    // console.log(jsonData);

    this.setState({
      userInfo: jsonData,
    });
    // console.log(this.props.name + " Child component did mount");
  }

  componentDidUpdate() {
    // console.log("Component did update for " + this.props.name);
  }
  componentWillUnmount() {
    // console.log("component will unmount");
  }
  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    // console.log(this.props.name + " Child Rendered");

    // console.log(count);
    return (
      <div className="user-card">
        <h1>Name of the User :{name}</h1>
        <h2>Location: {location}</h2>
        <img src={avatar_url} />
      </div>
    );
  }
}

export default UserClass;
