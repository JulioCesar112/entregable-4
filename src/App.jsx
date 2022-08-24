import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState();
  const [update, setUpdate] = useState();
  const [isOpenForm, setIsOpenForm] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    const URL = "https://users-crud1.herokuapp.com/users/";
    axios
      .get(URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const handleOpenForm = () => {
    setIsOpenForm(true);
  };
  const handleCloseForm = () => {
    setIsOpenForm(false)
    setUpdate()

    
  };

  const createNewUser = (data) => {
    const URL = "https://users-crud1.herokuapp.com/users/";
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
        handleCloseForm()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div className="div-open-form">
        <button className="open-form" onClick={handleOpenForm}>
          Create
        </button>
      </div>
      <div className="app-container">
        <div className={isOpenForm ? "form-container" : "form-none"}>
          <UserForm
            handleCloseForm={handleCloseForm}
            update={update}
            createNewUser={createNewUser}
            getAllUsers={getAllUsers}
            setUpdate={setUpdate}
          />
        </div>
        {users?.map((user) => (
          <UserList
            handleOpenForm={handleOpenForm}
            key={user.id}
            user={user}
            getAllUsers={getAllUsers}
            setUpdate={setUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
