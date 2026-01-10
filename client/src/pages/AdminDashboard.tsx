import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🧑‍💼 Admin Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Foods</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">120</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">56</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">34</CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mt-8">
        <Link to="/admin/add-food">
          <Button>Add Food ➕</Button>
        </Link>

        <Link to="/admin/foods">
          <Button variant="outline">Manage Foods 🍔</Button>
        </Link>
      </div>
    </div>
  );
}
