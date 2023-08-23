import React, { useState } from "react";
import signup from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import {useDispatch} from "react-redux"
 
import axios from "axios";
import { signupSccuess } from "../../redux/userSlice";
const Signup = () => {
  const Navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch()

  const [signupDeteils, setSignupDeteils] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputValueHandler = (e) => {
    setSignupDeteils({
      ...signupDeteils,
      [e.target.name]: e.target.value,
    });
  };

  const signupHandler = () => {
    if (signupDeteils.firstName == "" || signupDeteils.firstName == null) {
      api.error({
        message: `First name error `,
        description: "Please enter first name",
        placement: "top",
      });
      return false;
    }

    if (signupDeteils.lastName == "" || signupDeteils.lastName == null) {
      api.error({
        message: `Last name error `,
        description: "Please enter last name",
        placement: "top",
      });
      return false;
    }

    if (signupDeteils.email == "" || signupDeteils.email == null) {
      api.error({
        message: `Email error `,
        description: "Please enter email",
        placement: "top",
      });
      return false;
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(signupDeteils.email)
    ) {
      api.error({
        message: `Email address invalid `,
        description: "Please enter valid email",
        placement: "top",
      });
      return false;
    }

    if (signupDeteils.password == "") {
      api.error({
        message: `Password  error `,
        description: "Please enter password",
        placement: "top",
      });

      return false;
    }

    if (
      signupDeteils.password.length > 15 ||
      signupDeteils.password.length < 8
    ) {
      api.error({
        message: `Password error `,
        description:
          "Enter password mininum 8 characters and 15 maximum characters ",
        placement: "top",
      });
      return false;
    }

    if (signupDeteils.confirmPassword == "") {
      api.error({
        message: `Confirm password error `,
        description: "Please enter confirm password",
        placement: "top",
      });
      return false;
    }

    if (signupDeteils.confirmPassword !== signupDeteils.password) {
      api.error({
        message: `Confirm password error`,
        description:"Confirm password does not match",
        placement: "top",
      });
      return false;
    }
    setLoading(true)
    axios.post("https://chatgptserver-tibl.onrender.com/api/signup", signupDeteils)

      .then((res) => {
        setLoading(false)
        api.success({
          message: `Signup verification success`,
          description: res.data.message,
          placement: "top",
        });
        setTimeout(() => {
       Navigate("/login") 
          
        }, 2000);
       
      })
      .catch((err) => {
        setLoading(false)
        api.error({
          message: `Signup verification field`,
          description: err.response.data.message||"something went wrong",
          placement: "top",
        });
     
       return false
      });
     
      setSignupDeteils({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
  };

  return (
    <div className={signup.SignupContainer}>
      {contextHolder}
      <div className={signup.SignupForm}>
        <div className={signup.SignupFormHeading}>
          <h1>Create your account</h1>
          <p>
            Note that email adddress may be required for signup. Your email will
            only be used to verify your identity for security purposes.
          </p>
        </div>
        <div className={signup.SignupFormDeleits}>
          <div className={signup.SignupFormName}>
            <div className={signup.SignupFirstName}>
              <label htmlFor="fname">
                First Name<sup>*</sup>
              </label>
              <input
                type="text"
                name="firstName"
                id="fname"
                placeholder="Enter First Name"
                value={signupDeteils.firstName}
                onChange={inputValueHandler}
              />
            </div>
            <div className={signup.SignupLastName}>
              <label htmlFor="lname">
                Last Name<sup>*</sup>
              </label>

              <input
                type="text"
                name="lastName"
                id="lname"
                placeholder="Enter Last Name"
                value={signupDeteils.lastName}
                onChange={inputValueHandler}
              />
            </div>
          </div>

          <div className={signup.SignupFormEmail}>
            <label htmlFor="email">
              Email<sup>*</sup>
            </label>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={signupDeteils.email}
              onChange={inputValueHandler}
            />
          </div>
          <div className={signup.SignupFormPassword}>
            <label htmlFor="password">
              Password<sup>*</sup>
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={signupDeteils.password}
              onChange={inputValueHandler}
            />
          </div>
          <div className={signup.SignupFormConfirmPassword}>
            <label htmlFor="confirmPassword">
              Confirm Password<sup>*</sup>
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={signupDeteils.confirmPassword}
              placeholder="Enter Confirm Password"
              onChange={inputValueHandler}
            />
          </div>
          <div className={signup.SignupSummitBtn}>
            <button onClick={signupHandler}>{(loading)?"Loading...":"Signup"}</button>
          </div>
          <div className={signup.SignupAlready}>
            <p>
              Already have an account?{" "}
              <span onClick={() => Navigate("/login")}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
