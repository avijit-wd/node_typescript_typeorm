import { SyntheticEvent, useState } from "react";
import "../Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("login", {
      email,
      password,
    });
    setRedirect(true);
  };

  if (redirect) navigate("/");

  return (
    <main className="form-signin">
      <form onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please Login</h1>

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

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Login;
