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
import LoginSuccess from "./pages/LoginSuccess";
import Checkout from "@/pages/checkout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route
          path="/foods"
          element={
            <ProtectedRoute>
              <FoodList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
