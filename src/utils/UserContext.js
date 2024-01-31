import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "Default User",
  loginTime: 110998,
}); // creating a context so that we can use everywhere, the values passed here are default values

export default UserContext;
