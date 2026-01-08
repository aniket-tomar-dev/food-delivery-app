// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { X, Trash2 } from "lucide-react";

// type CartDrawerProps = {
//   open: boolean;
//   onClose: () => void;
// };

// const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
//   const { cart, incrementItem, decrementItem, removeFromCart } = useCart();

//   if (!open) return null;

//   const totalPrice = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="fixed inset-0 z-50 flex">
//       <div className="absolute inset-0 bg-black/20 " onClick={onClose} />

//       <div className="ml-auto w-full max-w-sm md:max-w-md lg:max-w-lg h-full bg-background text-foreground shadow-xl flex flex-col">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-lg font-semibold">Your Cart</h2>
//           <Button size="icon" variant="ghost" onClick={onClose}>
//             <X />
//           </Button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {cart.length === 0 && (
//             <p className="text-muted-foreground text-center">
//               Your cart is empty
//             </p>
//           )}

//           {cart.map((item, index) => (
//             <Card
//               key={index}
//               className="flex flex-row items-center gap-3 p-2 hover:shadow-md transition-shadow"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="h-16 w-16 rounded-md object-cover"
//               />

//               <CardContent className="flex-1 p-0">
//                 <CardHeader className="p-0">
//                   <CardTitle className="text-sm font-semibold">
//                     {item.name}
//                   </CardTitle>
//                 </CardHeader>
//                 <p className="text-xs text-muted-foreground mb-2">
//                   {item.weight}
//                 </p>

//                 <div className="flex items-center gap-2">
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => decrementItem(index)}
//                   >
//                     -
//                   </Button>

//                   <span className="w-6 text-center">{item.quantity}</span>

//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => incrementItem(index)}
//                   >
//                     +
//                   </Button>

//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     className="ml-auto"
//                     onClick={() => removeFromCart(index)}
//                   >
//                     <Trash2 size={16} />
//                   </Button>
//                 </div>
//               </CardContent>

//               <CardFooter className="p-0 ml-2">
//                 <span className="font-semibold">
//                   ₹{item.price * item.quantity}
//                 </span>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>

//         <div className="p-4 border-t">
//           <div className="flex justify-between font-semibold mb-3 text-lg">
//             <span>Total</span>
//             <span>₹{totalPrice}</span>
//           </div>
//           <Button className="w-full" variant="default">
//             Checkout
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartDrawer;

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart, incrementItem, decrementItem, removeFromCart } = useCart();

  const navigate = useNavigate();

  if (!open) return null;

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-50 ml-auto w-full max-w-md h-full bg-background text-foreground shadow-2xl flex flex-col rounded-l-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold tracking-tight">Your Cart</h2>
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-muted rounded-full"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-muted">
          {cart.length === 0 && (
            <p className="text-muted-foreground text-center mt-10">
              Your cart is empty 🛒
            </p>
          )}

          {cart.map((item, index) => (
            <Card
              key={index}
              className="flex gap-4 p-3 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-lg object-cover"
              />

              <CardContent className="flex-1 p-0">
                <CardHeader className="p-0 mb-1">
                  <CardTitle className="text-sm font-semibold leading-tight">
                    {item.name}
                  </CardTitle>
                </CardHeader>

                <p className="text-xs text-muted-foreground mb-2">
                  {item.weight}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 rounded-full"
                    onClick={() => decrementItem(index)}
                  >
                    −
                  </Button>

                  <span className="w-6 text-center text-sm font-medium">
                    {item.quantity}
                  </span>

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 rounded-full"
                    onClick={() => incrementItem(index)}
                  >
                    +
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="ml-auto text-destructive hover:bg-destructive/10"
                    onClick={() => removeFromCart(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="p-0 flex items-end">
                <span className="font-semibold text-sm">
                  ₹{item.price * item.quantity}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t bg-background">
          <div className="flex justify-between items-center text-base font-semibold mb-3">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
          <Button
            className="w-full h-11 rounded-xl text-base font-medium"
            disabled={cart.length === 0}
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
