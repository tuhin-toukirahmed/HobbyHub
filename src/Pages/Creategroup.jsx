import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../Provider/useAuth";
import { DataContext } from "../Provider/DataContext";

const Creategroup = () => {
  const { user } = useAuth();
  const { userEmail } = useContext(DataContext);
  const email = userEmail || user?.email || "";
  const [form, setForm] = useState({
    groupName: "",
    hobbyCategory: "",
    description: "",
    meetingLocation: "",
    maxMembers: "",
    startDate: "",
    imageUrl: "",
    host: user?.displayName || "",
    orientationFee: "",
    location: "",
    date: "",
    weeks: "",
    members: "",
    email: email,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

   useEffect(() => {
    setForm((prev) => ({
      ...prev,
      host: user?.displayName || "",
      email: userEmail || user?.email || "",
    }));
  }, [user, userEmail]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Don't allow changing the host field
    if (name === 'host') return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      // Use POST /mygroups (not /mygroups/:email) for group creation
      const res = await fetch(
        "https://hobby-hub-server-site.vercel.app/mygroups",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, email }),
        }
      );
      if (!res.ok) throw new Error("Failed to create group");
      setSuccess("Group created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto rounded-xl shadow p-6 mt-16 mb-10 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Create a New Group
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Group Name
          </label>
          <input
            type="text"
            name="groupName"
            value={form.groupName}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="Enter group name"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Hobby Category
          </label>
          <input
            type="text"
            name="hobbyCategory"
            value={form.hobbyCategory}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="e.g. Photography, Cooking"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="Describe your group"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Max Members
          </label>
          <input
            type="number"
            name="maxMembers"
            value={form.maxMembers}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            min="1"
            placeholder="e.g. 25"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="Paste an image URL"
          />
        </div>
       
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Orientation Fee
          </label>
          <input
            type="number"
            name="orientationFee"
            value={form.orientationFee}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            min="0"
            placeholder="e.g. 25"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="e.g. Urban Art Space, 78 Creative Lane"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Date (e.g. '2 days left')
          </label>
          <input
            type="text"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="e.g. 2 days left"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Weeks
          </label>
          <input
            type="number"
            name="weeks"
            value={form.weeks}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            min="1"
            placeholder="e.g. 4"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Members
          </label>
          <input
            type="number"
            name="members"
            value={form.members}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            min="1"
            placeholder="e.g. 18"
          />
        </div>
         <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Host
          </label>
          <input
            type="text"
            name="host"
            value={form.host}
            readOnly
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
            placeholder="Automatically set to your name"
          />
          <p className="text-xs text-gray-500 mt-1">
            Host name is automatically set to your name 
          </p>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            readOnly
            className="input input-bordered w-full bg-gray-100 dark:bg-dark-surface text-gray-700  "
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 rounded transition"
        >
          Create Group
        </button>
        {error && (
          <div className="text-red-500 mt-2 dark:text-red-400">{error}</div>
        )}
        {success && (
          <div className="text-green-600 mt-2 dark:text-green-400">
            {success}
          </div>
        )}
      </form>
    </div>
  );
};

export default Creategroup;
