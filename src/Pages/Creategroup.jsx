import React, { useState } from "react";

const Creategroup = () => {
  const [form, setForm] = useState({
    groupName: "",
    hobbyCategory: "",
    description: "",
    meetingLocation: "",
    maxMembers: 1,
    startDate: "",
    imageUrl: "",
    host: "",
    orientationFee: 0,
    location: "",
    date: "",
    weeks: 1,
    members: 1,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("http://localhost:3000/mygroups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create group");
      setSuccess("Group created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto rounded-xl shadow p-6 mt-16 mb-10 bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100 text-gray-900">Create a New Group</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="groupName"
          value={form.groupName}
          onChange={handleChange}
          required
          placeholder="Group Name"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="hobbyCategory"
          value={form.hobbyCategory}
          onChange={handleChange}
          required
          placeholder="Hobby Category"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          placeholder="Description"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="meetingLocation"
          value={form.meetingLocation}
          onChange={handleChange}
          required
          placeholder="Meeting Location"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="maxMembers"
          type="number"
          min="1"
          value={form.maxMembers}
          onChange={handleChange}
          required
          placeholder="Max Members"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="host"
          value={form.host}
          onChange={handleChange}
          placeholder="Host Name"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="orientationFee"
          type="number"
          min="0"
          value={form.orientationFee}
          onChange={handleChange}
          placeholder="Orientation Fee"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location (for card)"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Date (e.g. 2 days left)"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="weeks"
          type="number"
          min="1"
          value={form.weeks}
          onChange={handleChange}
          placeholder="Weeks"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <input
          name="members"
          type="number"
          min="1"
          value={form.members}
          onChange={handleChange}
          placeholder="Members"
          className="input input-bordered w-full bg-light-bg dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-dark-border"
        />
        <button
          type="submit"
          className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded text-lg transition dark:bg-blue-700 dark:hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
        {success && (
          <div className="text-green-600 dark:text-green-400 mt-2">{success}</div>
        )}
        {error && (
          <div className="text-red-600 dark:text-red-400 mt-2">{error}</div>
        )}
      </form>
    </div>
  );
};

export default Creategroup;
