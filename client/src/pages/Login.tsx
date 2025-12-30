import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/services/authService";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    mutate(formData);
  };
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-87.5">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 text-center">
              {(error as any)?.response?.data?.message || "Login failed"}
            </p>
          )}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button className="w-full" onClick={handleLogin} disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primary underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
