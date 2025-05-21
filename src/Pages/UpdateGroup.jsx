import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../Provider/useAuth";
import { DataContext } from "../Provider/DataContext";

const UpdateGroup = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const { userEmail } = useContext(DataContext);
  const email = userEmail || user?.email || "";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    groupName: "",
    hobbyCategory: "",
    description: "",
    meetingLocation: "",
    maxMembers: "",
    startDate: "",
    imageUrl: "",
    host: "",
    orientationFee: "",
    location: "",
    date: "",
    weeks: "",
    members: "",
    email: email,
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch group details to prefill the form
    const fetchGroup = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`http://localhost:3000/mygroups/details/${encodeURIComponent(groupId)}`);
        if (!res.ok) throw new Error("Failed to fetch group details");
        const data = await res.json();
        if (!data || !data._id) throw new Error("Group not found");
        setForm({ ...data, email: data.email || email });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (groupId) fetchGroup();
  }, [groupId, email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const { _id, ...updateData } = form;
      const res = await fetch(`http://localhost:3000/mygroups/${encodeURIComponent(groupId)}/${encodeURIComponent(email)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updateData,
          maxMembers: Number(form.maxMembers),
          orientationFee: Number(form.orientationFee),
          weeks: Number(form.weeks),
          members: Number(form.members),
        }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update group: ${errorText}`);
      }
      setSuccess("Group updated successfully!");
      setTimeout(() => navigate(`/my-group-details/${groupId}`));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-xl mx-auto rounded-xl shadow p-6 mt-16 mb-10 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Update Group</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Repeat the same fields as in Creategroup, prefilled with form values */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Group Name</label>
          <input type="text" name="groupName" value={form.groupName} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" placeholder="Enter group name" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Hobby Category</label>
          <input type="text" name="hobbyCategory" value={form.hobbyCategory} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" placeholder="e.g. Photography, Cooking" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" placeholder="Describe your group" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Meeting Location</label>
          <input type="text" name="meetingLocation" value={form.meetingLocation} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" placeholder="e.g. Urban Art Space, 78 Creative Lane" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Max Members</label>
          <input type="number" name="maxMembers" value={form.maxMembers} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" min="1" placeholder="e.g. 25" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Start Date</label>
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Image URL</label>
          <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" placeholder="Paste an image URL" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Host</label>
          <input type="text" name="host" value={form.host} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" placeholder="e.g. Ava Martinez" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Orientation Fee</label>
          <input type="number" name="orientationFee" value={form.orientationFee} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" min="0" placeholder="e.g. 25" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Location</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" placeholder="e.g. Urban Art Space, 78 Creative Lane" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Date (e.g. '2 days left')</label>
          <input type="text" name="date" value={form.date} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" placeholder="e.g. 2 days left" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Weeks</label>
          <input type="number" name="weeks" value={form.weeks} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" min="1" placeholder="e.g. 4" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Members</label>
          <input type="number" name="members" value={form.members} onChange={handleChange} required className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" min="1" placeholder="e.g. 18" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Your Email</label>
          <input type="email" name="email" value={email} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-200" />
        </div>
        <button type="submit" className="btn btn-primary w-full text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 rounded transition">Update Group</button>
        {error && <div className="text-red-500 mt-2 dark:text-red-400">{error}</div>}
        {success && <div className="text-green-600 mt-2 dark:text-green-400">{success}</div>}
      </form>
    </div>
  );
};

export default UpdateGroup;
