import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = () => {
  const [user, setUser] = useState(new User());
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("user");
      setUser(
        new User(
          data.id,
          data.first_name,
          data.last_name,
          data.email,
          data.role
        )
      );
    })();
  }, []);

  const logout = async () => {
    await axios.post("/logout", {});
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link to={"/"} className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
        Company name
      </Link>

      {/* <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <a className="nav-link px-3" href="#">
            Sign out
          </a>
        </div>
      </div> */}
      <ul className="my-2 my-md-0 mr-md-3">
        <Link to={"/profile"} className="p-2 text-white text-decoration-none">
          {user.name}
        </Link>
        <Link
          to={"/login"}
          className="p-2 text-white text-decoration-none"
          onClick={logout}
        >
          Sign out
        </Link>
      </ul>
    </header>
  );
};

export default Nav;
