import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const res = await api.get("/admin/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.put(`/admin/orders/${id}/status`, { status });
    fetchOrders();
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>📦 Orders Management</CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full border">
            <thead>
              <tr className="bg-muted text-left">
                <th className="p-2">User</th>
                <th>Email</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-2">{order.user?.name}</td>
                  <td>{order.user?.email}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2 py-2">
                    <Button
                      size="sm"
                      onClick={() => updateStatus(order._id, "Delivered")}
                    >
                      Delivered
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(order._id, "Cancelled")}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
