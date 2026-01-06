import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

type AddToCartDialogProps = {
  open: boolean;
  onClose: () => void;
  food: {
    name: string;
    price: number;
    image: string;
    weight: string;
  };
};

const AddToCartDialog = ({ open, onClose, food }: AddToCartDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Item to Cart</DialogTitle>
        </DialogHeader>

        {/* 🛒 Product Info */}
        <div className="flex gap-4">
          <img
            src={food.image}
            alt={food.name}
            className="h-24 w-24 rounded-md object-cover"
          />

          <div className="flex-1 space-y-1">
            <h3 className="font-semibold">{food.name}</h3>
            <p className="text-sm text-muted-foreground">{food.weight}</p>
            <p className="font-semibold">₹{food.price}</p>
          </div>
        </div>

        {/* 🔢 Quantity */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-medium">Quantity</span>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </Button>

            <span>{quantity}</span>

            <Button
              size="icon"
              variant="outline"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* 💰 Total */}
        <div className="flex justify-between font-semibold mt-2">
          <span>Total</span>
          <span>₹{food.price * quantity}</span>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              addToCart({
                ...food,
                quantity,
              });
              onClose();
            }}
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartDialog;
