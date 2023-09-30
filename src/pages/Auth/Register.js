import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { auth } from "../../firebase/config";

import "./Auth.css";
const Register = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isloading, setIsloading] = useState(false);

  const registerUser = e => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords not match");
    } else {
      setIsloading(true);
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        toast.success("Regiseration Success...");
        navigate("/login");
        // ...
      })
      .catch(error => {
        toast.error(error.message);
        setIsloading(false);
        // ..
      });
  };
  return (
    <>
      {isloading && <Loader />}
      <div className="--center-all auth">
        <div className="authCard --flex-center --dir-column">
          <h2 className="auth-header">Be a eLol. member </h2>

          <form className="authInputs" onSubmit={registerUser}>
            <div className="authInput --flex-center --dir-column ">
              <label>Email</label>
              <input
                type="email"
                name="register-email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="authInput --flex-center --dir-column ">
              <label>Password</label>
              <input
                type="password"
                name="register-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="authInput --flex-center --dir-column ">
              <label>Confirm password</label>
              <input
                type="password"
                name="register-cpassword"
                value={cPassword}
                onChange={e => setCPassword(e.target.value)}
                required
              />
            </div>
            <div className="authSubmit">
              <button type="submit">Register</button>
            </div>
          </form>

          <div className="authLink">
            You already a member?<Link to="/login"> Sign in now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
