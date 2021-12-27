import { SyntheticEvent, useState } from "react";
import "../Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("register", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    });

    setRedirect(true);
  };

  if (redirect) {
    navigate("/login");
  }
  return (
    <main className="form-signin">
      <form onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

        <input
          className="form-control"
          placeholder="First Name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="Last Name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Register;
