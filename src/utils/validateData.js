export const validateData = (email, password, name = "Default") => {
  // console.log(email, password, name);

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
     password
    );
  const isNameValid = /^([a-zA-Z]{3,})$/.test(name);
  // console.log(isNameValid, isEmailValid, isPasswordValid);

  if (!isNameValid) return "Enter full name";

  if (!isEmailValid) return "Email ID is not valid";

  if (!isPasswordValid) return "Password is not valid";

  return null;
};
