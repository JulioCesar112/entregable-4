import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  birthday: "",
};


const UserForm = ({ handleCloseForm, createNewUser, update, getAllUsers, setUpdate }) => {
  const { register, handleSubmit, reset } = useForm();

   useEffect(() => {
    if (update) {
      reset(update);
    }
  }, [update]);

  const submit = (data) => {
    if (update) {
      const URL = `https://users-crud1.herokuapp.com/users/${update.id}/`;
      axios
        .put(URL, data)
        .then((res) => {
          console.log(res.data);
          getAllUsers()
          handleCloseForm()
          setUpdate()
          reset(defaultValues)
          
        })
        .catch((err) => console.log(err));
    } else {
      createNewUser(data);
      reset(defaultValues);
    }
  };

  const handlereset = () => {
    reset(defaultValues)
    handleCloseForm()
  }

  return (
    <form className="form" onSubmit={handleSubmit(submit)}>
      <div className="form-close-div">
        <div onClick={handlereset}className="form-close"></div>
        </div>
      <h1>{update ? "Update" : "Create User"}</h1>
      <div>
        <div className="form-name-last">
            <label htmlFor="first_name">
              <i className="bx bxs-user"></i>
            </label>
          <div>
            <input
              className="input-name"
              placeholder="first name"
              {...register("first_name")}
              type="text"
              id="first_name"
            />
          </div>
            <label htmlFor="last_name"></label>
          <div>
            <input
              className="input-name"
              placeholder="last name"
              {...register("last_name")}
              type="text"
              id="last_name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">
            <i className="bx bxs-envelope"></i>
          </label>
          <input
            placeholder="email"
            {...register("email")}
            type="text"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">
            <i className="bx bxs-lock-alt"></i>
          </label>
          <input
            placeholder="password"
            {...register("password")}
            type="password"
            id="password"
          />
        </div>
        <div>
          <label htmlFor="birthday">
            <i className="bx bxs-cake"></i>
          </label>
          <input {...register("birthday")} type="date" id="birthday" />
        </div>
      </div>
      <div>
        <button className="form-btn">{update ? "Update" : "Create"}</button>
      </div>
    </form>
  );
};

export default UserForm;
