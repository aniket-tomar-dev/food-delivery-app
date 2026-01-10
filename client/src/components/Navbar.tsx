import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  ShoppingCart,
  LogOut,
  UserRoundPlus,
  CircleUser,
  Shield,
} from "lucide-react";

import logo from "@/assets/rapid.png";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const [openCart, setOpenCart] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src={logo} className="h-8 w-8 rounded-xl" />
          Rapid Food
        </Link>

        {!isMobile && (
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/foods">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {user?.isAdmin && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/admin">Admin Panel</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <div className="flex items-center gap-4">
          <div
            className="relative cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <ShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {totalItems}
              </span>
            )}
          </div>

          {!token ? (
            <>
              <Link to="/signup">
                <Button variant="outline">
                  {" "}
                  <UserRoundPlus />
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button>
                  {" "}
                  <CircleUser /> Sign In
                </Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {user?.isAdmin && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <Shield className="mr-2 h-4 w-4" /> Admin Panel
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={logout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <ModeToggle />
        </div>

        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col gap-4">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              {user?.isAdmin && <Link to="/admin">Admin Panel</Link>}
            </SheetContent>
          </Sheet>
        )}
      </div>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </header>
  );
}
