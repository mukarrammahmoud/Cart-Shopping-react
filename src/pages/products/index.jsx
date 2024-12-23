import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProducts, ThemeContext } from "../../context";
import { useContext } from "react";
import ProductTitle from "../../components/ProductItem";
import LoadingComponent from "../../components/LoadingComponents";
import ErrorComponent from "../../components/ErrorComponent";

function Products() {
  // const queryClint = useQueryClient();
  // const inputRef = useRef();
  const { darkMode } = useContext(ThemeContext);
  // const { , toggleDarkMode } = useContext(ThemeContext);

  const {
    data: products,
    isLoading,

    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    // staleTime: 1000 * 60 * 5,
    // refetchInterval: 2000,
    // retry: 3,
    refetchOnWindowFocus: false,
  });

  // "id": 1,
  // "title": "His mother had always taught him",
  // "body": "His mother had always
  const { isError, isPending, isSuccess } = useMutation({
    mutationFn: (newPost) => {
      return fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      }).then((res) => res.json());
    },
    onSuccess: async () => {
      fetchProducts;
    },
  });

  if (isLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  if (isPending) return <p>Pendding...</p>;
  if (isSuccess) {
    // return alert("Adding Successfly");
  }
  if (error || isError) return <ErrorComponent error={error} />;

  return (
    <div>
      <section
        className={`py-12 ${
          darkMode ? " bg-customDark-1" : "customLight-1"
        } sm:py-16 lg:by-20`}
      >
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
          <div className="max-w-md mx-auto text-center">
            <h2
              className={`text=3xl font-extrabold text- ${
                darkMode ? " bg-customDark-1" : "customLight-1"
              } sm:text-4xl`}
            >
              our Feature Products
            </h2>
          </div>
          <div
            className={`grid grid-cols-2 gap-5 mt-10 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4`}
          >
            {products.products && products.products.length > 0 ? (
              products.products.map((product) => {
                return (
                  <ProductTitle
                    key={product.id}
                    product={product}
                  ></ProductTitle>
                );
              })
            ) : (
              <h1>Not Found Products</h1>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Products;
