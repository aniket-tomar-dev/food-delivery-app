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

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart, incrementItem, decrementItem, removeFromCart } = useCart();

  if (!open) return null;

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/20 " onClick={onClose} />

      {/* DRAWER */}
      <div className="ml-auto w-full max-w-sm md:max-w-md lg:max-w-lg h-full bg-background text-foreground shadow-xl flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 && (
            <p className="text-muted-foreground text-center">
              Your cart is empty
            </p>
          )}

          {cart.map((item, index) => (
            <Card
              key={index}
              className="flex flex-row items-center gap-3 p-2 hover:shadow-md transition-shadow"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-md object-cover"
              />

              {/* DETAILS */}
              <CardContent className="flex-1 p-0">
                <CardHeader className="p-0">
                  <CardTitle className="text-sm font-semibold">
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <p className="text-xs text-muted-foreground mb-2">
                  {item.weight}
                </p>

                {/* QUANTITY CONTROL */}
                <div className="flex items-center gap-2">
                  {/* DECREMENT */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => decrementItem(index)} // directly call context function
                  >
                    -
                  </Button>

                  <span className="w-6 text-center">{item.quantity}</span>

                  {/* INCREMENT */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => incrementItem(index)} // directly call context function
                  >
                    +
                  </Button>

                  {/* DELETE */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="ml-auto"
                    onClick={() => removeFromCart(index)} // directly call context function
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>

              {/* PRICE */}
              <CardFooter className="p-0 ml-2">
                <span className="font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t">
          <div className="flex justify-between font-semibold mb-3 text-lg">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
          <Button className="w-full" variant="default">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
