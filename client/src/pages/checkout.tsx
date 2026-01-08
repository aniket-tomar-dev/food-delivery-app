import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    await api.post(
      "/orders/create",
      {
        items: cart,
        address,
        totalAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    clearCart();
    toast.success("Order placed 🎉", {
      description: "Your food will be delivered soon",
    });
    navigate("/foods");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">Checkout</h2>

      <textarea
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <p className="font-semibold">Total: ₹{totalAmount}</p>

      <Button className="w-full" onClick={placeOrder}>
        Place Order (COD)
      </Button>
    </div>
  );
};

export default Checkout;
