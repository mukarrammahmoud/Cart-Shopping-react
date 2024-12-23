import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductsDetails } from "../../context";
import { useState, useEffect } from "react";
import LoadingComponent from "../../components/LoadingComponents";
import ErrorComponent from "../../components/ErrorComponent";

function ProductsList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [savedInCart, setSavedInCart] = useState(false);

  // Fetch product details
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => fetchProductsDetails(id),
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isInCart = cart.some((product) => product.id === Number(id));
    setSavedInCart(isInCart);
  }, [id]);

  const { mutate: addToCart } = useMutation({
    mutationFn: (productData) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(productData), 500); // Simulate API delay
      });
    },
    onSuccess: (productData) => {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

      const isProductInCart = currentCart.some(
        (product) => product.id === productData.id
      );
      if (!isProductInCart) {
        const updatedCart = [...currentCart, productData];

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        queryClient.setQueryData(["cart"], updatedCart);

        setSavedInCart(true);

        navigate("/cart");
      }
    },
    onError: (error) => {
      console.error("Error adding to cart:", error.message);
    },
  });

  function handleAddToCart() {
    if (data) {
      addToCart(data);
    }
  }

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent error={error} />;
  console.log(isLoading);

  return (
    <div>
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div
          key={data.id}
          className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6"
        >
          {}
          {/* Product Image */}
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-xl shadow-lg relative">
              <img
                className="w-4/5 rounded object-cover"
                src={data.thumbnail}
                alt={data.title}
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {data?.images?.map((image, index) => (
                <div className="rounded-xl p-4 shadow-md m-1" key={index}>
                  <img
                    className="w-24 cursor-pointer"
                    src={image}
                    alt={`image ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold ">{data.title}</h2>
            <h3 className="text-2xl font-medium ">{data.description}</h3>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-xl font-bold ">${data.price}</p>
            </div>
            <div>
              {savedInCart ? (
                <p className="text-green-400 font-semibold mt-5">
                  Product is already in the cart
                  <Link className="text-blue-600 font-bold" to={"/"}>
                    {" "}
                    Back
                  </Link>
                </p>
              ) : (
                <div className="flex justify-evenly">
                  <button
                    onClick={handleAddToCart}
                    className="min-w-[200px] px-4 py-3 border border-[#555] bg-transparent text-sm font-semibold rounded mt-5"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="min-w-[200px] px-4 py-3 border border-[#555] bg-transparent text-sm font-semibold rounded mt-5"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
