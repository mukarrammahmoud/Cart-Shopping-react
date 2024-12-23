import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/* eslint-disable react/prop-types */
function ProductTitle({ product }) {
  const navigate = useNavigate();

  function handleNavigateToProductDetails(id) {
    navigate(`/product-details/${id}`);
  }
  const queryClient = useQueryClient();

  const [savedInCart, setSavedInCart] = useState(false);

  const darkMode = useContext(ThemeContext);
  function handleAddToCart(singleProduct) {
    if (singleProduct) {
      addToCart(singleProduct);
    }
  }
  const { mutate: addToCart } = useMutation({
    mutationFn: (productData) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(productData), 500); // Simulate API delay
      });
    },
    onSuccess: (productData) => {
      console.log(productData);
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

      const isProductInCart = currentCart.some(
        (product) => product.id === productData.id
      );

      if (!isProductInCart) {
        const updatedCart = [...currentCart, productData];

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        queryClient.setQueryData(["cart"], updatedCart);
        console.log(updatedCart);

        setSavedInCart(true);
      }
    },
    onError: (error) => {
      console.error("Error adding to cart:", error.message);
    },
  });
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isInCart = cart.some((pro) => pro.id === product.id);
    setSavedInCart(isInCart);
  }, []);
  return (
    <div
      className={`relative group border border-${
        darkMode ? "white-700" : "black"
      } p-6 cursor-pointer`}
    >
      <div className="overflow-hidden aspect-w-1 aspect-h1">
        <img
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
          src={product?.thumbnail}
          alt={product.title}
        />
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold  sm:text-sm text-x5 md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {product.title}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-xs font-bold  sm:text-sm md:text-[14px]`}>
            {" "}
            $ {product.price}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          handleNavigateToProductDetails(product.id);
        }}
        className={`px-5 mt-5 w-full py-2 rounded-none ${
          darkMode ? " bg-white text-black" : "bg-black text-white "
        } font-bold text-lg`}
      >
        View Details
      </button>
      { (
        <button 
           disabled={savedInCart}
          onClick={() => handleAddToCart(product)}
          className={ `disabled:opacity-60 px-5 mt-5 w-full py-2 rounded-none ${
            darkMode ? " bg-white text-black" : "bg-black text-white "
          } font-bold text-lg`}
        >
          Add To Cart
        </button>
      )}
    </div>
  );
}
export default ProductTitle;
