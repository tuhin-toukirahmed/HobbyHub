import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Provider/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { signUp, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(password))
      return "Password must have an uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must have a lowercase letter.";
    return null;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setError(passwordError);
      toast.error(passwordError);
      return;
    }
    try {
      await signUp(form.email, form.password);
      // Send user data to server after successful signup
      await fetch("https://hobby-hub-server-site.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          photoURL: form.photoURL,
          createdAt: new Date().toISOString(),
        }),
      });
      toast.success("Registration successful!");
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
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Register
        </h1>
        <div className="mb-4">
          <label className="block mb-1 text-gray-900">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
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
        <div className="mb-4">
          <label className="block mb-1 text-gray-900">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
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
          Register
        </button>
        <button
          type="button"
          className="btn btn-outline w-full mt-2 text-gray-900 hover:bg-gray-200"
          onClick={async () => {
            try {
              const user = await signInWithGoogle();
              // Send user data to server after Google signup
              if (user && user.user) {
                await fetch("https://hobby-hub-server-site.vercel.app/users", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: user.user.displayName || "",
                    email: user.user.email || "",
                    photoURL: user.user.photoURL || "",
                    createdAt: new Date().toISOString(),
                  }),
                });
              }
              toast.success("Continue with Google successful!");
              navigate("/");
            } catch (err) {
              setError(err.message);
              toast.error(err.message);
            }
          }}
        >
          Continue with Google
        </button>
        <div className="mt-4 text-center text-gray-900">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
