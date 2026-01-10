import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    const fetchUser = async () => {
      const res = await api.get("/auth/me");
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate(res.data.isAdmin ? "/admin" : "/foods");
    };

    fetchUser();
  }, []);

  return <p className="text-center mt-10">Logging you in...</p>;
}
