import { Fragment, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Products from "./pages/products";
import ProductsList from "./pages/productDetails";
import Cart from "./pages/cart";
import { ThemeContext } from "./context";
import { FaSun, FaMoon ,FaShoppingCart} from "react-icons/fa";
import Checkout from "./pages/checkout";
function App() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <Fragment>
      <div
        className={`${
          darkMode
            ? "bg-customDark-1 text-white"
            : "bg-customLight-1 text-black"
        }`}
      >
        <div className="">
          <div
            className={`mt-8 float-right mr-10`}
            onClick={() => toggleDarkMode(!darkMode)}
          >
            {darkMode ? (
              <FaSun className="text-yellow-500" size={24} />
            ) : (
              <FaMoon className="text-cyan-500" size={24} />
            )}
          </div>
          <div
            onClick={() => navigate("/cart")}
            className={`mt-8 float-left ml-10 cursor-pointer`}
          >
           <FaShoppingCart size={30} className={`${darkMode?"text-yellow-500":"text-cyan-500"}`}/>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Products></Products>} />
          <Route
            path="product-details/:id"
            element={<ProductsList></ProductsList>}
          />
          <Route path="cart" element={<Cart></Cart>} />
          <Route path="checkout" element={<Checkout></Checkout>} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
