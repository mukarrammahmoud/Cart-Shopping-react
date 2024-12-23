// function Checkout() {
//   return (
//     <div className="p-6 lg:max-w-7xl max-w-4xl h-lvh">
//       <h1 className="text-3xl font-extrabold text-center mb-6">Checkout</h1>
//     </div>
//   );
// }
// export default Checkout;

import { Link } from "react-router-dom";

function Checkout() {
  return (
    <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold  text-center mb-6">
        Checkout
      </h1>
      <div className="w-full bg-white rounded-lg shadow-lg p-8 mt-2 ">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Billing Details
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Address
            </label>
            <textarea
              className="w-full p-3 border  rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="4"
              placeholder="Enter your shipping address"
            ></textarea>
          </div>
        </form>
      </div>
      {/* <div className="w-full bg-white rounded-lg shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Product 1</p>
            <p className="font-bold text-gray-800">$20.00</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Product 2</p>
            <p className="font-bold text-gray-800">$15.00</p>
          </div>
          <div className="flex justify-between border-t pt-4">
            <p className="text-lg font-bold text-gray-800">Total</p>
            <p className="text-lg font-bold text-blue-500">$35.00</p>
          </div>
        </div>
        <button className="w-full mt-6 px-4 py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-200">
          Place Order
        </button>
      </div> */}
       <div className="w-full mt-6 px-4 py-3 bg-cyan-500 text-white rounded-md font-semibold hover:bg-gray-600 transition duration-600 text-center">
         <Link to={`/`} className="text-white"> Back To Shopping</Link>
        </div>
    </div>
  );
}

export default Checkout;
