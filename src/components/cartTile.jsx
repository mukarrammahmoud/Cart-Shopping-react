/* eslint-disable react/prop-types */
function CartTile({ product, handleRemoveFromCart }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center">
        <img
          className="w-20 h-20 object-cover rounded-md"
          src={product.thumbnail}
          alt={product.title}
        />
        <div className="ml-4">
          <p className="text-xl font-semibold">{product.title}</p>
          <p className="text-lg ">${product.price}</p>
        </div>
      </div>
      <button
        onClick={() => handleRemoveFromCart(product.id)}
        className="text-red-600 font-bold hover:underline"
      >
        Remove
      </button>
    </div>
  );
}

export default CartTile;
