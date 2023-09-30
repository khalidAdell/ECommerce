import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import "./Auth.css";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { GoogleAuthProvider } from "firebase/auth";

const LogIn = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  let location = useLocation();

  const redirectPath = location.state?.path || "/";

  const loginUser = e => {
    e.preventDefault();
    setIsloading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        toast.success("Login Successful...");
        setIsloading(false);
        navigate(redirectPath, { replace: true });
      })
      .catch(error => {
        toast.error(error.message);
        setIsloading(false);
        // ..
      });
  };

  const provider = new GoogleAuthProvider();
  const signWithGoogle = () => {
    setIsloading(true);
    signInWithPopup(auth, provider)
      .then(result => {
        toast.success("Login Successful...");
        setIsloading(false);
        navigate("/");
      })
      .catch(error => {
        toast.error(error.message);
        setIsloading(false);
      });
  };
  return (
    <>
      <ToastContainer />
      {isloading && <Loader />}
      <div className="--center-all auth">
        <div className="authCard --flex-center --dir-column">
          <h2 className="auth-header">Welcome To eLol. </h2>
          <div className="signBtns --flex-center">
            <button className="--btn --flex-center" onClick={signWithGoogle}>
              <BsGoogle size={15} style={{ margin: "0 3px 0 0 " }} />
              Google
            </button>
          </div>
          <form onSubmit={loginUser} className="authInputs">
            <div className="authInput --flex-center --dir-column ">
              <label>Username</label>
              <input
                type="email"
                name="signIn-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="authInput --flex-center --dir-column ">
              <label>
                Password
                <Link to="/reset" className="resetLink">
                  {"  "}
                  Forgot?
                </Link>
              </label>
              <input
                type="password"
                name="signIn-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="authSubmit">
              <button>Sign In</button>
            </div>
          </form>
          <div className="authLink">
            Not A member?<Link to="/register"> Sign up now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
