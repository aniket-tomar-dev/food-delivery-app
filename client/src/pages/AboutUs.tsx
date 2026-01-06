import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Truck, Leaf, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-3">
          About Us
        </Badge>
        <h1 className="text-4xl font-bold mb-3">Ghar Ka Swad</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Fresh, hygienic aur ghar jaisa khana – delivered straight to your
          door.
        </p>
      </div>

      <Separator className="mb-10" />

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Truck className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Fast Delivery</CardTitle>
            <CardDescription>
              Fresh food, right time par — bina compromise ke.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Leaf className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Fresh & Hygienic</CardTitle>
            <CardDescription>
              Ghar ke jaise bana khana, 100% hygiene ke saath.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <HeartHandshake className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Made with Love</CardTitle>
            <CardDescription>Har dish me maa ke haath ka swad.</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Ghar Ka Swad</strong> ka idea ek simple soch se aaya — bahar
            ka khana tasty hota hai, par ghar jaisa nahi. Isliye hum local
            kitchens aur home chefs ke saath milkar healthy, affordable aur
            tasty meals deliver karte hain.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why Choose Us?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>✅ No preservatives</p>
            <p>✅ Pocket-friendly prices</p>
            <p>✅ Daily fresh cooking</p>
            <p>✅ Trusted home chefs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
