import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">🍔 Food Delivery App</h1>

      <p className="text-muted-foreground text-center max-w-md">
        Login to explore delicious food items and place your order.
      </p>

      <div className="flex gap-3">
        <Link to="/login">
          <Button>Login</Button>
        </Link>

        <Link to="/signup">
          <Button variant="outline">Signup</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-[90vh] flex flex-col items-center justify-center px-4">
//       {/* Hero Section */}
//       <div className="text-center space-y-4 max-w-2xl">
//         <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//           🍔 Order Your Favourite Food <br />
//           <span className="text-primary">Anytime, Anywhere</span>
//         </h1>

//         <p className="text-muted-foreground text-lg">
//           Discover delicious meals, fast delivery and seamless ordering
//           experience.
//         </p>

//         <div className="flex justify-center gap-4 pt-4">
//           <Link to="/login">
//             <Button size="lg">Login</Button>
//           </Link>

//           <Link to="/signup">
//             <Button size="lg" variant="outline">
//               Signup
//             </Button>
//           </Link>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
//         <Card>
//           <CardContent className="p-6 text-center space-y-2">
//             <p className="text-3xl">🚀</p>
//             <h3 className="font-semibold text-lg">Fast Delivery</h3>
//             <p className="text-sm text-muted-foreground">
//               Get your food delivered hot & fresh at lightning speed.
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6 text-center space-y-2">
//             <p className="text-3xl">🍕</p>
//             <h3 className="font-semibold text-lg">Best Quality</h3>
//             <p className="text-sm text-muted-foreground">
//               We partner with top restaurants to ensure quality food.
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6 text-center space-y-2">
//             <p className="text-3xl">💳</p>
//             <h3 className="font-semibold text-lg">Easy Payment</h3>
//             <p className="text-sm text-muted-foreground">
//               Secure and hassle-free online payment options.
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Home;
