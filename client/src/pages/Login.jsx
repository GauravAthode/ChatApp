import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message || "Login successful");
      sessionStorage.setItem("chatUser", JSON.stringify(res.data.data));
      navigate("/overview");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-base-content">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
            className="input input-bordered w-full
              placeholder:text-base-content/60
              focus:border-primary"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
            className="input input-bordered w-full
              placeholder:text-base-content/60
              focus:border-primary"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full
              hover:btn-secondary
              text-primary-content
              hover:text-secondary-content"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-base-content/70">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary
              hover:text-secondary"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
