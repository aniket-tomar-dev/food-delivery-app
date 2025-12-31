import { useEffect, useState } from "react";
import { getFoods } from "@/services/foodService";
import mainImg from "../assets/main.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FoodCard from "@/components/FoodCard";
import FoodCarousel from "./FoodCrousel";

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

const FoodList = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"all" | "price" | "rating">("all");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchFoods = async () => {
    try {
      setLoading(true);

      const data = await getFoods({
        page,
        limit,
        search: search || undefined,
        sortBy: sortBy !== "all" ? sortBy : undefined,
        order: sortBy !== "all" ? order : undefined,
      });

      setFoods(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch foods", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [page, sortBy, order]);

  useEffect(() => {
    if (sortBy === "all") {
      setOrder("asc");
    }
  }, [sortBy]);

  const handleSearch = () => {
    setPage(1);
    fetchFoods();
  };

  if (loading) {
    return (
      <p className="text-center text-muted-foreground mt-10">
        Loading food items...
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-lg shadow-md dark:bg-gray-800">
        {/* Image */}
        <div className="shrink-0 w-full md:w-1/2">
          <img
            src={mainImg}
            alt="Description"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-gray-700 dark:text-gray-200 text-sm md:text-base">
          Our food delivery app brings your favorite restaurants and delicious
          meals right to your doorstep. With a wide variety of cuisines, fresh
          ingredients, and fast delivery, we make every order convenient and
          satisfying. Whether you’re craving pizza, burgers, biryani, or
          desserts, everything is just a few taps away. The app offers a
          user-friendly interface, secure payment options, and real-time order
          tracking for a smooth experience. Our goal is to provide quality food,
          reliable service, and a hassle-free ordering process, ensuring that
          every customer enjoys great taste and comfort with every meal.
        </div>
      </div>

      <br />

      <FoodCarousel />

      <h1 className="text-3xl font-bold mb-6">🍽️ Food Menu</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Input
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="pr-10"
          />

          <Button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Search size={18} />
          </Button>
        </div>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All (Default)</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={order}
          onValueChange={(v) => setOrder(v as any)}
          disabled={sortBy === "all"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Low → High</SelectItem>
            <SelectItem value="desc">High → Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage(page - 1);
              }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0, 10)
            .map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={page === p}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) setPage(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default FoodList;
