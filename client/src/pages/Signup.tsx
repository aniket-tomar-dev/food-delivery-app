import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "@/services/authService";
import { useState } from "react";
import { toast } from "sonner";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      await signupUser(formData);
      toast.success("SignUp successful 🎉", {
        description: "Welcome back!",
      });

      navigate("/login");
    } catch (err: any) {
      toast.error("Signup failed ❌", {
        description: "Required Name , Email or password",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-87.5">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <Input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

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

          <Input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />

          <Button className="w-full" onClick={handleSignup} disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          <Button variant="outline" className="w-full" disabled>
            Login with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
