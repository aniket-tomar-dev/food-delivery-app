import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import Navbar from "@/components/Navbar";
import FoodList from "@/pages/FoodList";
import Login from "@/pages/Login";
import Signup from "../src/pages/Signup";
import About from "../src/pages/AboutUs";
import ContactUs from "./pages/Contact";
import Home from "./pages/Home";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Footer from "./pages/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foods" element={<FoodList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/foods"
          element={
            <ProtectedRoute>
              <FoodList />
            </ProtectedRoute>
          }
        />
        {/* baad me aur pages add kar sakte ho */}
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
