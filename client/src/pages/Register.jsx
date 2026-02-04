import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // frontend validation (extra safety)
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      toast.success(res.data.message || "Registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-base-content">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            className="input input-bordered w-full placeholder:text-base-content/60"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full placeholder:text-base-content/60"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full placeholder:text-base-content/60"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full hover:btn-secondary"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-base-content/70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-secondary"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
