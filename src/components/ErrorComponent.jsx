/* eslint-disable react/prop-types */

function ErrorComponent({ error }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-400 to-pink-600">
      <div className="flex flex-col items-center animate-fadeIn">
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-3xl font-extrabold text-red-600 mb-4">
            Oops! Something went wrong!
          </h2>
          <p className="text-lg text-gray-800 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
export default ErrorComponent;
