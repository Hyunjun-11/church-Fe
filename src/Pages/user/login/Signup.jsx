import { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Name, setName] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onNameHandler = (event) => {
    setName(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("Passwords do not match!");
    }

    console.log("Email", Email);
    console.log("Password", Password);
    console.log("Name", Name);

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    // Here you would typically make an API request to register the user
    // e.g., axios.post('/api/users/register', body)
  };

  return (
    <div className="Signup">
      <form className="SignupForm" onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
