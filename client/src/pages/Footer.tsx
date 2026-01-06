import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react"; // shadcn icons
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FooterLink = {
  name: string;
  href: string;
};

export default function Footer() {
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [email, setEmail] = useState("");

  // Simulate API call for dynamic links
  useEffect(() => {
    const fetchLinks = async () => {
      // Replace this with your API call
      const data: FooterLink[] = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" },
      ];
      setLinks(data);
    };
    fetchLinks();
  }, []);

  const handleSubscribe = () => {
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <footer className="mt-10 border-t  backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-bold">MyApp</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Building modern web applications with MERN Stack.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-primary">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase flex items-center gap-2">
            <Mail className="w-4 h-4" /> Newsletter
          </h3>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleSubscribe}>Subscribe</Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Stay updated with latest news and offers.
          </p>
        </div>
      </div>

      <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}
