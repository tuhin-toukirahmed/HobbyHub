import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Provider/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

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
    e.preventDefault();
    try {
      await signIn(form.email, form.password);
      window.alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      window.alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded shadow-md w-full max-w-md
          bg-dark-surface text-dark-text
          dark:bg-white dark:text-light-text"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-light-bg text-[#d1d5db] dark:bg-light-bg dark:text-dark-bg border border-dark-border dark:border-light-muted"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-light-bg text-[#d1d5db] dark:bg-light-bg dark:text-dark-bg border border-dark-border dark:border-light-muted pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-12 transform -translate-y-1/2 text-xl text-[#d1d5db] focus:outline-none z-20"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaRegEyeSlash size={22} />
            ) : (
              <FaRegEye size={22} />
            )}
          </button>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
        <button
          type="button"
          className="btn btn-outline w-full mt-2"
          onClick={async () => {
            try {
              await signInWithGoogle();
              window.alert("Login with Google successful!");
              navigate("/");
            } catch (err) {
              setError(err.message);
              window.alert(err.message);
            }
          }}
        >
          Login with Google
        </button>
        <div className="mt-4 text-center">
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
