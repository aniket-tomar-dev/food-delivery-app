import { useState } from "react";
import { addFood } from "../services/foodService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddFood() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "veg",
  });

  const submit = async () => {
    await addFood({
      name: form.name,
      price: Number(form.price),
      type: form.type,
    });
    alert("Food added");
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

          <select
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          <Button onClick={submit}>Add Food</Button>
        </CardContent>
      </Card>
    </div>
  );
}
