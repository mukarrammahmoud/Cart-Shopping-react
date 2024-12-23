/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
//create the context
//provide the state to context
//wrap context in root component
//cosume the context 'using useContext()'

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  //   const [products, setProducts] = useState({
  //     loading: false,
  //     listProducts: [],
  //   });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

export const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchProductsDetails=async (id)=> {
 
  
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  
  
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
         console.log(response.body);
         

  return  response.json();
}
