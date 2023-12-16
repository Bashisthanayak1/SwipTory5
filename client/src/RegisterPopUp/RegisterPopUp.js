import React, { useState } from "react";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = (props) => {

  // axios.defaults.withCredentials = true;
  const originURL = "https://swiptory5backend.onrender.com";

  //useStates
  const [closeRegister, setCloseRegister] = useState(true);
  const [userDetails, setuserDetails] = useState({
    username: "",
    password: "",
  });

  //function runs when we click cross sign
  function CrossSign() {
    console.log("clicked x");
    setCloseRegister(() => false);
    props.setRegisterClicked(() => false);
  }

  //function runs when we input
  function updatingInputValues(event) {
    const { name, value } = event.target;
    setuserDetails((pre) => {
      return { ...pre, [name]: value };
    });
  }

  //create account button functions
  function submitRegisterForm(e) {
    e.preventDefault();
    //removing white space
    const password = userDetails.password.trim();
    if (userDetails.username && password !== "") {
      axios
        .post(`${originURL}/register`, userDetails)
        .then((res) => {
          console.log("Registration success:", res.data); // Log the response data
          setuserDetails({
            username: "",
            password: "",
          });
          toast.success("Successfully registred", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            setCloseRegister(() => false);
            props.setRegisterClicked(() => false);
          }, 1900);
        })
        .catch((err) => {
          console.error("Registration error:", err); // Log the error

          return toast.error("unable to register", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      return toast.error("Empty details", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
      <ToastContainer />
      {closeRegister && (
        <div className="register--divs--container">
          <div className="register--div">
            <div className="Cross--for--close" onClick={CrossSign}>
              x
            </div>
            <h2 className="RegisterBox--name">Register to Swip Tory</h2>

            <form action="" onSubmit={submitRegisterForm}>
              <label htmlFor="">Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={userDetails.username}
                onChange={updatingInputValues}
              />
              <br />
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userDetails.password}
                onChange={updatingInputValues}
              />
              <br />
              <input
                type="submit"
                value="register"
                id="PopUp--register--Button"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
