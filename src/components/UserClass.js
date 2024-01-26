import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      count: 0,
      count2: 45,
    };
    console.log(this.props.name+" Child Constructor");

    // console.log(this.state);
  }

  componentDidMount() {
    console.log(this.props.name+" Child component did mount");
  }
  render() {
    const { name, location, age } = this.props;
    const { count } = this.state;
    console.log(name+" Child Rendered");

    // console.log(count);
    return (
      <div className="user-card">
        <h1>Name of the User :{name}</h1>
        <h2>Location: {location}</h2>
        <h2>{count}</h2>
        <button
          onClick={() => {
            this.setState({
              count: count + 1,
            });
          }}
        >
          Increase count
        </button>
        <h3>Age:{age}</h3>
      </div>
    );
  }
}

export default UserClass;
