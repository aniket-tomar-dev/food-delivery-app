import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AddToCartDialog from "./AddToCartDialog";

type Food = {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  type: "veg" | "non-veg";
  weight: string;
  description: string;
  isAvailable: boolean;
};

type FoodCardProps = {
  food: Food;
};

function getFoodImageURL(imageUrl: string) {
  try {
    new URL(imageUrl);
    return imageUrl;
  } catch (error) {
    const url = `${import.meta.env.VITE_API_BASE_IMAGE_URL}${imageUrl}`;
    return url;
  }
}

const FoodCard = ({ food }: FoodCardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className="overflow-hidden transition hover:shadow-lg">
        <div className="relative">
          <img
            src={getFoodImageURL(food.image)}
            alt={food.name}
            className="h-48 w-full object-cover"
          />

          <Badge
            variant="outline"
            className={cn(
              "absolute top-2 left-2",
              food.type === "veg"
                ? "bg-green-50 text-green-700 border-green-300"
                : "bg-red-50 text-red-700 border-red-300"
            )}
          >
            {food.type === "veg" ? "VEG" : "NON-VEG"}
          </Badge>
        </div>

        <CardHeader>
          <CardTitle className="flex justify-between">
            {food.name}
            <span className="text-sm text-muted-foreground">
              ⭐ {food.rating}
            </span>
          </CardTitle>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {food.description}
          </p>
        </CardHeader>

        <CardContent className="flex justify-between">
          <p className="text-lg font-semibold">₹{food.price}</p>
          <p className="text-sm text-muted-foreground">{food.weight}</p>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Badge
            variant="outline"
            className={cn(
              food.isAvailable
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-rose-50 text-rose-700 border-rose-300"
            )}
          >
            {food.isAvailable ? "Available" : "Out of Stock"}
          </Badge>

          <Button
            size="sm"
            disabled={!food.isAvailable}
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
      <AddToCartDialog open={open} onClose={() => setOpen(false)} food={food} />
    </>
  );
};

export default FoodCard;
