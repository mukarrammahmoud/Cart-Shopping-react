import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import CartTile from "../../components/cartTile";
import { ThemeContext } from "../../context";
import LoadingComponent from "../../components/LoadingComponents";
import ErrorComponent from "../../components/ErrorComponent";

function Cart() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const darkMode = useContext(ThemeContext);
  const {
    data: cart = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      const cachedData = queryClient.getQueryData(["cart"]) || [];
      const localData = JSON.parse(localStorage.getItem("cart")) || [];
      return [...new Set([...cachedData, ...localData])];
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);

    queryClient.setQueryData(["cart"], updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // const handleRemoveFromCart = (productId) => {
  // const updatedCart = cart.filter((product) => product.id !== productId);
  // queryClient.setQueryData(["cart"], updatedCart);
  // localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  // };

  // Calculate total price
  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);

  if (isLoading) <LoadingComponent />;
  if (isError) return <ErrorComponent error={error} />;

  return (
    <div className="p-6 lg:max-w-7xl max-w-4xl ">
      <h2 className="text-3xl font-extrabold text-center mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center font-bold text-xl text-gray-500 mb-4">
            Your cart is empty
          </p>
          <hr className="h-1 bg-cyan-500 m-2" />
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-3 bg-green-500 text-white rounded-md font-semibold hover:bg-gray-600 mt-4"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((product) => (
              <CartTile
                key={product.id}
                product={product}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>

          <div
            className={`p-6 ${
              darkMode ? "bg-white text-black" : "bg-black text-white"
            } rounded-md shadow-md flex flex-col justify-start transition-all duration-300 ease-in-out h-[400px]`}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              Cart Summary
            </h3>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium">Total Items:</p>
              <p className="text-lg font-semibold">{cart.length}</p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-medium">Total Price:</p>
              <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={() => navigate("/checkout")}
              className="disabled:opacity-60 w-full px-4 py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
              Proceed to Checkout
            </button>

            <hr className="my-6 border-t border-gray-300" />

            <button
              onClick={() => navigate("/")}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
