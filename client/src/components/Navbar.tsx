import { Link } from "react-router-dom";
import { Menu, CircleUser, UserRoundPlus } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle";
import logo from "@/assets/rapid.png";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Dialog from "./DialogBox";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const isMobile = useIsMobile();

  const token = localStorage.getItem("token");

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/";
  // };

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <img
            src={logo}
            alt="Food Deliver Logo"
            className="h-8 w-8 object-contain rounded-xl"
          />
          Rapid Food
        </Link>

        {!isMobile && (
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/">Home</Link>
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
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <Link to="/signup">
                <Button>
                  <UserRoundPlus size={18} /> Sign Up
                </Button>
              </Link>

              <Link to="/login">
                <Button>
                  <CircleUser size={18} /> Sign In
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/foods">
                <Button variant="outline">Foods</Button>
              </Link>
              <Dialog />
            </>
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
              <Link to="/" className="text-lg font-medium">
                Home
              </Link>
              <Link to="/about" className="text-lg font-medium">
                About
              </Link>
              <Link to="/contact" className="text-lg font-medium">
                Contact
              </Link>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
}
