import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Provider/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    try {
      await signIn(form.email, form.password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-dark-surface p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-900">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1 text-gray-900">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="input input-bordered w-full pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-12 transform -translate-y-1/2 text-xl focus:outline-none z-20"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaRegEyeSlash
                size={22}
                className="text-gray-900 dark:text-gray-200"
              />
            ) : (
              <FaRegEye size={22} className="text-gray-900 dark:text-gray-200" />
            )}
          </button>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
        <button
          type="button"
          className="btn btn-outline w-full mt-2 text-gray-900 hover:bg-gray-200"
          onClick={async () => {
            try {
              await signInWithGoogle();
              toast.success("Login with Google successful!");
              navigate("/");
            } catch (err) {
              setError(err.message);
              window.alert(err.message);
            }
          }}
        >
          Login with Google
        </button>
        <div className="mt-4 text-center text-gray-900">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
