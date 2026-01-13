import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isAdmin: boolean;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (id: string) => {
    await api.put(`/admin/users/${id}/block`);
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await api.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>👥 User Management</CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full border">
            <thead>
              <tr className="bg-muted text-left">
                <th className="p-2">Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-2">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isBlocked ? (
                      <span className="text-red-500">Blocked</span>
                    ) : (
                      <span className="text-green-500">Active</span>
                    )}
                  </td>
                  <td>{user.isAdmin ? "Admin" : "User"}</td>
                  <td className="flex gap-2 py-2">
                    {!user.isAdmin && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => toggleBlock(user._id)}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
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
