import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful 🎉", {
        description: "Welcome back!",
      });
      navigate(data.user.isAdmin ? "/admin" : "/foods");
    },
    onError: (error: any) => {
      toast.error("Login failed ❌", {
        description:
          error?.response?.data?.message || "Invalid email or password",
      });
    },
  });

  const onsubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-87.5">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 text-center">
              {(error as any)?.response?.data?.message || "Login failed"}
            </p>
          )}

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              window.open("http://localhost:5000/api/auth/google", "_self")
            }
          >
            <FcGoogle /> Continue with Google
          </Button>

          <Button
            className="w-full"
            onClick={handleSubmit(onsubmit)}
            disabled={isPending}
          >
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
