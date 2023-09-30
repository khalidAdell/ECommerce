import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";

import "./Auth.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
const Reset = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  const [isloading, setIsloading] = useState(false);

  const resetPassword = e => {
    e.preventDefault();
    setIsloading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email...");
        setIsloading(false);
        navigate("/login");
      })
      .catch(error => {
        toast.error(error.message);
        setIsloading(false);
      });
  };
  return (
    <>
      {isloading && <Loader />}
      <div className="--center-all auth">
        <div className="authCard --flex-center --dir-column">
          <h2 className="auth-header">Rsest Password</h2>
          <div className="signBtns --flex-center">
            <button className="--btn --flex-center">
              <BsGoogle size={15} style={{ margin: "0 3px 0 0 " }} />
              Google
            </button>
          </div>
          <form onSubmit={resetPassword} className="authInputs">
            <div className="authInput --flex-center --dir-column ">
              <label>Email</label>
              <input
                type="email"
                name="reset-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </form>
          <div className="authSubmit">
            <button type="submit">Reset Password</button>
          </div>
          <div className="authLink">
            Want to try again?<Link to="/login"> Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
