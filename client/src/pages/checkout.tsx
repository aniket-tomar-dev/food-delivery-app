// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import api from "@/lib/api";
// import { toast } from "sonner";

// const Checkout = () => {
//   const { cart, clearCart } = useCart();
//   const [address, setAddress] = useState("");
//   const navigate = useNavigate();
//   // const [showConfetti, setShowConfetti] = useState(false);

//   const totalAmount = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   // const [windowSize, setWindowSize] = useState({
//   //   width: window.innerWidth,
//   //   height: window.innerHeight,
//   // });

//   // useEffect(() => {
//   //   const handleResize = () => {
//   //     setWindowSize({
//   //       width: window.innerWidth,
//   //       height: window.innerHeight,
//   //     });
//   //   };

//   //   window.addEventListener("resize", handleResize);
//   //   return () => window.removeEventListener("resize", handleResize);
//   // }, []);

//   const placeOrder = async () => {
//     if (!address.trim()) {
//       alert("Please enter delivery address");
//       return;
//     }

//     try {
//       const res = await api.post(
//         "/orders/create",
//         {
//           items: cart,
//           address,
//           totalAmount,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       // 🎉 ORDER SUCCESS
//       // setShowConfetti(true);
//       clearCart();

//       toast.success("Order placed 🎉", {
//         description: "Your food will be delivered soon",
//       });

//       setTimeout(() => {
//         // setShowConfetti(false);
//         navigate(`/orders/${res.data._id}`);
//       }, 6000);
//     } catch (error) {
//       toast.error("Order failed", {
//         description: "Please try again",
//       });
//     }
//   };
//   return (
//     <div className="max-w-xl mx-auto p-6 space-y-4">
//       {/* {showConfetti && (
//         <Confetti
//           width={windowSize.width}
//           height={windowSize.height}
//           numberOfPieces={250}
//           recycle={false}
//         />
//       )} */}

//       <h2 className="text-xl font-bold">Checkout</h2>

//       <textarea
//         placeholder="Delivery Address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         className="w-full border p-3 rounded"
//       />

//       <p className="font-semibold">Total: ₹{totalAmount}</p>

//       <Button className="w-full" onClick={placeOrder}>
//         Place Order (COD)
//       </Button>
//     </div>
//   );
// };

// export default Checkout;
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "sonner";
import OrderSuccessDialog from "@/components/OrderSuccessDialog";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderId, setOrderId] = useState("");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    try {
      const res = await api.post(
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
      setOrderId(res.data._id);
      setShowSuccessDialog(true);

      toast.success("Order placed 🎉", {
        description: "Your food will be delivered soon",
      });
    } catch (error) {
      toast.error("Order failed", {
        description: "Please try again",
      });
    }
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
        Proceed to Checkout
      </Button>

      {/* ✅ Order Success Dialog */}
      <OrderSuccessDialog
        open={showSuccessDialog}
        orderId={orderId}
        onClose={() => setShowSuccessDialog(false)}
      />
    </div>
  );
};

export default Checkout;
