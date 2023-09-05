import React, { useState } from "react";
import login from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notification, Modal, Alert } from "antd";
import { useDispatch } from "react-redux";
import { loginSccuess } from "../../redux/userSlice";
const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [LoginDeteils, setLoginDeteils] = useState({
    email: "",
    password: "",
  });

  const inputValueHandler = (e) => {
    setLoginDeteils({
      ...LoginDeteils,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = () => {
    setLoading(true);

    axios
      .post("https://chatgptserver-tibl.onrender.com/api/login", LoginDeteils)
      .then((res) => {
        api.success({
          message: `Login success`,
          description: res.data.message,
          placement: "top",
        });
        dispatch(loginSccuess(res.data.user));
        localStorage.setItem("chatgpt",res.data.token)
        setLoading(false);
        setTimeout(()=>{
          Navigate("/chatgpt")
          window.location.reload(); 

         },2000)
       
      }) 

      .catch((err) => {
        api.error({
          message: `Login  field`,
          description: err.response.data.message || "something went wrong",
          placement: "top",
        });
        setLoading(false);
        return false;
      });
    setLoginDeteils({
      email: "",
      password: "",
    });
  };

  return (
    <div className={login.LoginContainer}>
      {contextHolder}
      <div className={login.LoginForm}>
        <div className={login.LoginFormHeading}>
          <h1>Welcome back</h1>
          <p>
            Note that registered email and password required for login. Your
            email and password will only be used to verify your identity for
            login purposes.
          </p>
        </div>
        <div className={login.LoginFormDeleits}>
          <div className={login.LoginFormEmail}>
            <label htmlFor="email">
              Email<sup>*</sup>
            </label>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={LoginDeteils.email}
              onChange={inputValueHandler}
            />
          </div>
          <div className={login.LoginFormPassword}>
            <label htmlFor="password">
              Password<sup>*</sup>
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={LoginDeteils.password}
              onChange={inputValueHandler}
            />
          </div>

          <div className={login.LoginSummitBtn}>
            <button onClick={loginHandler}>
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
          <div className={login.forgetPassword}>
            <ForgetPassword />
          </div>
          <div className={login.LoginAlready}>
            <p>
              Don't have an account? <span onClick={() => Navigate("/signup")}> Signup</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

export const ForgetPassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggle, setToogle] = useState(false);
  const [userId, setUserId] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (toggle == false) {
      axios
        .put("https://chatgptserver-tibl.onrender.com/api/forgot", { email })
        .then((res) => {
          api.success({
            message: `Email verification success`,
            description: res.data.message,
            placement: "top",
          });
          setToogle(true);
          setUserId(res.data.userId);
        })
        .catch((err) => {
          api.error({
            message: `Email verification field`,
            description: err.response.data.message || "something went wrong",
            placement: "top",
          });
          setToogle(false);
        });
    } else {
      if (password == "" || password == null) {
        api.error({
          message: `Password  error `,
          description: "Please enter password",
          placement: "top",
        });
        return false;
      }

      if (password.length > 15 || password.length < 8) {
        api.error({
          message: `Password error `,
          description:
            "Enter password mininum 8 characters and 15 maximum characters ",
          placement: "top",
        });
        return false;
      }

      if (confirmPassword == "" || confirmPassword == null) {
        api.error({
          message: `Confirm password error `,
          description: "Please enter confirm password",
          placement: "top",
        });
        return false;
      }

      if (confirmPassword !== password) {
        api.error({
          message: `Confirm password error`,
          description: "Confirm password does not match",
          placement: "top",
        });
        return false;
      }

      axios
        .put("https://chatgptserver-tibl.onrender.com/api/forgot", { email, password, userId })
        .then((res) => {
          api.success({
            message: `Password forgot success`,
            description: res.data.message,
            placement: "top",
          });
          setToogle(false);
        })
        .catch((err) => {
          api.error({
            message: `Password forgot field`,
            description: err.response.data.message || "something went wrong",
            placement: "top",
          });
          setToogle(false);
        });
      setEmail("");
      setUserId("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <span onClick={showModal}>forgot pasword</span>
      <Modal
        title="forgot pasword"
        open={isModalOpen}
        onOk={handleOk}
        okText={!toggle ? "Verify" : "Forgot"}
        onCancel={handleCancel}
      >
        <>
          {!toggle ? (
            <div className={login.LoginFormEmail}>
              <label htmlFor="email">
                Email<sup>*</sup>
              </label>

              <input
                style={{
                  padding: "8px 5px",
                  outline: "none",
                  borderRadius: "5px",
                  border: "0.4px solid lightgray",
                }}
                type="email"
                placeholder="Enter registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <>
              <Alert message="email verification success" type="success" />
              <div className={login.LoginFormEmail}>
                <label>
                  New Password<sup>*</sup>
                </label>

                <input
                  type="password"
                  style={{
                    padding: "8px 5px",
                    outline: "none",
                    borderRadius: "5px",
                    border: "0.4px solid lightgray",
                  }}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={login.LoginFormEmail}>
                <label >
                  Confirm Password<sup>*</sup>
                </label>

                <input
                  style={{
                    padding: "8px 5px",
                    outline: "none",
                    borderRadius: "5px",
                    border: "0.4px solid lightgray",
                  }}
                  type="password"
                  placeholder="Enter confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}
        </>
      </Modal>
    </>
  );
};
