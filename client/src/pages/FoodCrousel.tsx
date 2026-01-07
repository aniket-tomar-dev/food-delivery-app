// // import { useState } from "react";
// // import pizza from "../assets/pizza.png";
// // import cake from "../assets/cake.png";
// // import burger from "../assets/burger.png";
// // import biryani from "../assets/biryani.png";
// // import rolls from "../assets/rolls.png";
// // import momo from "../assets/momo.png";
// // import icecream from "../assets/icecream.png";
// // import pastry from "../assets/pastry.png";
// // import pavBhaji from "../assets/pavbhaji.png";
// // import GulabJamun from "../assets/gulabjamun.png";
// // import idli from "../assets/idli.png";
// // import khicdi from "../assets/Khichdi.png";

// // type FoodItem = {
// //   name: string;
// //   img: string;
// // };

// // const foodItems: FoodItem[] = [
// //   { name: "Pizza", img: pizza },
// //   { name: "Cake", img: cake },
// //   { name: "Burger", img: burger },
// //   { name: "Biryani", img: biryani },
// //   { name: "Rolls", img: rolls },
// //   { name: "Momo", img: momo },
// //   { name: "Ice Cream", img: icecream },
// //   { name: "Pastry", img: pastry },
// //   { name: "Pav Bhaji", img: pavBhaji },
// //   { name: "Gulab Jamun", img: GulabJamun },
// //   { name: "Idli", img: idli },
// //   { name: "Khichdi", img: khicdi },
// // ];

// // export default function FoodCarousel() {
// //   const [scrollX, setScrollX] = useState(0);

// //   const scrollLeft = () => {
// //     setScrollX(scrollX - 300);
// //   };

// //   const scrollRight = () => {
// //     setScrollX(scrollX);
// //   };

// //   return (
// //     <div className="relative px-4 py-6">
// //       <h2 className="text-lg font-semibold mb-4">
// //         Order our best food options
// //       </h2>

// //       <button
// //         onClick={scrollLeft}
// //         className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 z-10"
// //       >
// //         &#8592;
// //       </button>
// //       <button
// //         onClick={scrollRight}
// //         className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 z-10"
// //       >
// //         &#8594;
// //       </button>

// //       <div
// //         className="flex gap-6 overflow-x-auto scrollbar-hide transition-all"
// //         style={{ transform: `translateX(-${scrollX}px)` }}
// //       >
// //         {foodItems.map((food) => (
// //           <div
// //             key={food.name}
// //             className="shrink-0 w-24 md:w-32 text-center cursor-pointer hover:scale-105 transition-transform"
// //           >
// //             <img
// //               src={food.img}
// //               alt={food.name}
// //               className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
// //             />
// //             <p className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-200">
// //               {food.name}
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// import { useRef } from "react";
// import pizza from "../assets/pizza.png";
// import cake from "../assets/cake.png";
// import burger from "../assets/burger.png";
// import biryani from "../assets/biryani.png";
// import rolls from "../assets/rolls.png";
// import momo from "../assets/momo.png";
// import icecream from "../assets/icecream.png";
// import pastry from "../assets/pastry.png";
// import pavBhaji from "../assets/pavbhaji.png";
// import GulabJamun from "../assets/gulabjamun.png";
// import idli from "../assets/idli.png";
// import samosa from "../assets/samosa.png";
// // import khicdi from "../assets/Khichdi.png";

// type FoodItem = {
//   name: string;
//   img: string;
// };

// const foodItems: FoodItem[] = [
//   { name: "Pizza", img: pizza },
//   { name: "Cake", img: cake },
//   { name: "Burger", img: burger },
//   { name: "Biryani", img: biryani },
//   { name: "Rolls", img: rolls },
//   { name: "Momo", img: momo },
//   { name: "Ice Cream", img: icecream },
//   { name: "Pastry", img: pastry },
//   { name: "Pav Bhaji", img: pavBhaji },
//   { name: "Gulab Jamun", img: GulabJamun },
//   { name: "Idli", img: idli },
//   { name: "Samosa ", img: samosa },
//   // { name: "Khichdi", img: khicdi },
// ];

// export default function FoodCarousel() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({
//       left: -280,
//       behavior: "smooth",
//     });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({
//       left: 280,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="relative px-4 py-6">
//       <h2 className="text-lg font-semibold mb-4">
//         Order our best food options
//       </h2>

//       {/* LEFT ARROW */}
//       <button
//         onClick={scrollLeft}
//         className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-105 transition"
//       >
//         &#8592;
//       </button>

//       {/* RIGHT ARROW */}
//       <button
//         onClick={scrollRight}
//         className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-105 transition"
//       >
//         &#8594;
//       </button>

//       {/* SCROLL AREA */}
//       <div className="overflow-hidden">
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-8"
//         >
//           {foodItems.map((food) => (
//             <div
//               key={food.name}
//               className="shrink-0 w-28 md:w-32 text-center cursor-pointer"
//             >
//               {/* IMAGE CONTAINER */}
//               <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-md hover:shadow-lg transition">
//                 <img
//                   src={food.img}
//                   alt={food.name}
//                   className="w-20 h-20 md:w-24 md:h-24 object-contain"
//                 />
//               </div>

//               {/* TITLE */}
//               <p className="mt-2 text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
//                 {food.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
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
// import khicdi from "../assets/Khichdi.png";
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
