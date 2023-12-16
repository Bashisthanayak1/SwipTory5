import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = (props) => {
  
  // axios.defaults.withCredentials = true;
  const originURL = "https://swiptory5backend.onrender.com";

  //useStates
  const [closeLogin, setCloseLogin] = useState(true);
  const [userDetails, setuserDetails] = useState({
    username: "",
    password: "",
  });

  //function runs when we click cross sign
  function CrossSign() {
    console.log("clicked x");
    setCloseLogin(() => false);
    props.setSignInClicked(() => false);
  }

  //function runs when we input
  function updatingInputValues(event) {
    const { name, value } = event.target;
    setuserDetails((pre) => {
      return { ...pre, [name]: value };
    });
  }

  //create account button functions
  function submitLoginForm(e) {
    e.preventDefault();
    //removing white space
    const password = userDetails.password.trim();
    if (userDetails.username && password !== "") {
      axios
        .post(`${originURL}/login`, userDetails)
        .then((res) => {
          console.log("Login :", res.data); // Log the response data
          //saving username in sessionStorage
          sessionStorage.setItem("username", userDetails.username);
          setuserDetails({
            username: "",
            password: "",
          });
          toast.success("Successfully Loggedin", {
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
            setCloseLogin(() => false);
            props.setSignInClicked(() => false);
          }, 1900);
        })
        .catch((err) => {
          console.error("Login error:", err); // Log the error

          return toast.error("unable to Login", {
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
      {closeLogin && (
        <div className="register--divs--container">
          <div className="register--div">
            <div className="Cross--for--close" onClick={CrossSign}>
              x
            </div>
            <h2 className="RegisterBox--name">Login to Swip Tory</h2>

            <form action="" method="POST" onSubmit={submitLoginForm}>
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
              <input type="submit" value="login" id="PopUp--register--Button" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
