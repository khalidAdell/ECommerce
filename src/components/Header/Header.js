import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/Slices/AuthSlice";
const Header = () => {
  let [showNav, setShowNav] = useState(false);
  const [uname, setUname] = useState("");
  let dispatch = useDispatch();
  let { isLoggedIn } = useSelector((state) => state.auth);
  let { cartProducts } = useSelector((state) => state.products);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          SET_ACTIVE_USER({
            isLoggedIn: true,
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
          })
        );
        user.displayName == null
          ? setUname(
              user.email.charAt().toLocaleUpperCase() +
                user.email.slice(1, user.email.indexOf("@"))
            )
          : setUname(user.displayName);
      } else {
        dispatch(REMOVE_ACTIVE_USER());
        setUname("");
      }
    });
  }, [dispatch, uname]);

  const cart = (
    <NavLink to="/cart" className="cart">
      Cart
      <FaShoppingCart size={20} />
      {cartProducts.length > 0 && <p>{cartProducts.length}</p>}
    </NavLink>
  );

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successful...");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <h2>
              e<span>Lol</span>.
            </h2>
          </Link>
        </div>

        <nav className={showNav ? "showNav headerNav" : "headerNav"}>
          <ul>
            {showNav ? (
              <AiOutlineClose
                size={20}
                onClick={() => setShowNav((prev) => !prev)}
                className="closeNav"
              />
            ) : null}
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <NavLink to="/myorders">My Orders</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="right-header">
            {isLoggedIn ? (
              <>
                <Link to="/" className="userName">
                  <FaUserCircle size={15} />
                  hi, {uname}
                </Link>
                <Link to="/login" onClick={logoutUser}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <NavLink to="/login">LogIn</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
            {isLoggedIn && <span>{cart}</span>}
          </div>
        </nav>
        <div className="navMenu">
          <span
            className="menuIcon"
            onClick={() => setShowNav((prev) => !prev)}
          >
            <AiOutlineMenu size={20} />
          </span>
          {cart}
        </div>
      </div>
      {showNav ? (
        <div
          className="overlayer"
          onClick={() => setShowNav((prev) => !prev)}
        ></div>
      ) : null}
    </header>
  );
};

export default Header;
