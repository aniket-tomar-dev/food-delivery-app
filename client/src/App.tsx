import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import Navbar from "@/components/Navbar";
import FoodList from "@/pages/FoodList";
import Login from "@/pages/Login";
import Signup from "../src/pages/Signup";
import About from "../src/pages/AboutUs";
import ContactUs from "./pages/Contact";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />

      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/foods" element={<FoodList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* baad me aur pages add kar sakte ho */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
