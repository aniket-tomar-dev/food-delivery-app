import { useCart } from "@/context/CartContext";

const CartBox = () => {
  const { cart } = useCart();

  return (
    <div className="p-4 border rounded-md space-y-3">
      <h2 className="font-semibold text-lg">Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span>
            {item.name} ({item.weight}) × {item.quantity}
          </span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}
    </div>
  );
};

export default CartBox;
