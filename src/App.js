import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import {
  Home,
  MyOrders,
  Contact,
  Cart,
  LogIn,
  Register,
  Reset,
  Product,
  NotFound,
  Shop,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./components/RequireAuth";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ToastContainer style={{ zIndex: "99999" }} />
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route
            path="/myorders"
            element={
              <RequireAuth>
                <MyOrders />
              </RequireAuth>
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route path="shop/:productId" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
