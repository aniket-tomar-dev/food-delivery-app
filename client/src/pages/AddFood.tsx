import { useState } from "react";
import { addFood } from "../services/foodService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AddFood() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    weight: "",
    description: "",
    rating: "5",
    type: "veg",
    isAvailable: true,
    image: null as File | null,
  });

  const submit = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("weight", form.weight);
    formData.append("description", form.description);
    formData.append("rating", form.rating);
    formData.append("type", form.type);
    formData.append("isAvailable", String(form.isAvailable));

    if (form.image) {
      formData.append("image", form.image);
    }

    await addFood(formData);
    toast.success("Food added successfully");
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Food</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <input
            placeholder="Food name"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Price"
            type="number"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            placeholder="Weight (e.g. 250g)"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />

          <textarea
            placeholder="Food description"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1–5)"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          />

          <select
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={(e) =>
                setForm({ ...form, isAvailable: e.target.checked })
              }
            />
            Available
          </label>

          <input
            type="file"
            accept="image/*"
            className="border p-2 w-full"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files?.[0] || null })
            }
          />
          <Button onClick={submit}>Add Food</Button>
        </CardContent>
      </Card>
    </div>
  );
}
