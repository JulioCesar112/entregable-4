import axios from "axios";
import React from "react";

const UserList = ({ user, getAllUsers, setUpdate, handleOpenForm }) => {
  const deleteUserById = () => {
    const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`;
    axios
      .delete(URL)
      .then((res) => {
        getAllUsers();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateInfo = () => {
    setUpdate(user)
    handleOpenForm()
  };

  return (
    <div className="card">
      <div className="card-container">
        <h1 className="card-name"><i className="bx bxs-user"></i>  {`${user.first_name} ${user.last_name}`}</h1>
        <p className="card-email"><i className="bx bxs-envelope"></i>  {user.email}</p>
        <h2 className="card-birthday"><i className="bx bxs-cake"></i>  {user.birthday}</h2>
      </div>

      <div className="btns">
        <a onClick={updateInfo} href="#" className="btn-update">
          <i className="bx bxs-edit-alt"></i>
        </a>
        <a onClick={deleteUserById} href="#" className="btn-delete">
          <i className="bx bxs-trash-alt"></i>
        </a>
      </div>
    </div>
  );
};

export default UserList;
