import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

interface Props {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

export default function OrderSuccessDialog({ open, onClose, orderId }: Props) {
  const navigate = useNavigate();

  return (
    <>
      {open && <Confetti />}

      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <CheckCircle className="mx-auto text-green-500 w-14 h-14" />
            <DialogTitle className="text-2xl mt-2">
              Order Placed Successfully 🎉
            </DialogTitle>
            <DialogDescription className="mt-2">
              Your delicious food is being prepared and will reach you soon.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted p-4 rounded-md text-sm mt-4">
            <p>
              <span className="font-medium">Order ID:</span> #{orderId}
            </p>
            <p className="mt-1">
              <span className="font-medium">Estimated Delivery:</span> 30 mins
            </p>
          </div>

          <DialogFooter className="flex gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                onClose();
                navigate("/foods");
              }}
            >
              Order More
            </Button>

            <Button
              onClick={() => {
                onClose();
                navigate(`/orders/${orderId}`);
              }}
            >
              Track Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
