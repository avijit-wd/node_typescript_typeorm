import axios from "axios";
import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { User } from "../models/user";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("users");

      setUsers(data.data);
    })();
  }, []);
  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>{user.role.name}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Users;
