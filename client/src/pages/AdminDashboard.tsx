import { useEffect, useState } from "react";
import { getAdminStats } from "../services/foodService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    getAdminStats().then(setStats);
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🧑‍💼 Admin Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Foods</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalFoods}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalOrders}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalUsers}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mt-8">
        <Link to="/admin/add-food">
          <Button>Add Food ➕</Button>
        </Link>

        <Link to="/admin/users">
          <Button variant="outline">Manage Users 👥</Button>
        </Link>
        <Link to="/admin/orders">
          <Button variant="outline">Manage Orders 📦</Button>
        </Link>
      </div>
    </div>
  );
}
