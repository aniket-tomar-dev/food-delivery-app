import pizza from "../assets/pizza.png";
import cake from "../assets/cake.png";
import burger from "../assets/burger.png";
import biryani from "../assets/biryani.png";
import rolls from "../assets/rolls.png";
import momo from "../assets/momo.png";
import icecream from "../assets/icecream.png";
import pastry from "../assets/pastry.png";
import pavBhaji from "../assets/pavbhaji.png";
import GulabJamun from "../assets/gulabjamun.png";
import idli from "../assets/idli.png";
import samosa from "../assets/samosa.png";

type FoodItem = {
  name: string;
  img: string;
};

const foodItems: FoodItem[] = [
  { name: "Pizza", img: pizza },
  { name: "Cake", img: cake },
  { name: "Burger", img: burger },
  { name: "Biryani", img: biryani },
  { name: "Rolls", img: rolls },
  { name: "Momo", img: momo },
  { name: "Ice Cream", img: icecream },
  { name: "Pastry", img: pastry },
  { name: "Pav Bhaji", img: pavBhaji },
  { name: "Gulab Jamun", img: GulabJamun },
  { name: "Idli", img: idli },
  { name: "Samosa ", img: samosa },

  // { name: "Khichdi", img: khicdi },
];

export default function FoodCarousel() {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-6">Order our best fast food</h2>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {foodItems.map((food) => (
          <div key={food.name} className="text-center cursor-pointer group">
            {/* Image */}
            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition">
              <img
                src={food.img}
                alt={food.name}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>

            {/* Name */}
            <p className="mt-3 text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
              {food.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
