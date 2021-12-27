import Menu from "./Menu";
import Nav from "./Nav";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapper: React.FC = ({ children }) => {
  const navigate = useNavigate();

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("user");
      } catch (err) {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) {
    navigate("/login");
  }
  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
