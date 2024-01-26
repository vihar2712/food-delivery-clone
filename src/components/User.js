import { useState } from "react";

const User = (props) => {
  const [count] = useState(0);
  const [count2] = useState(18);
  const { name, location, age } = props;
  return (
    <div className="user-card">
      <h1>Name of the User: {name}</h1>
      <h2>Location: {location}</h2>
      <h2>Function Count = {count}</h2>
      <h2>Function Count2 = {count2}</h2>
      <h3>Age : {age}</h3>
    </div>
  );
};

export default User;
