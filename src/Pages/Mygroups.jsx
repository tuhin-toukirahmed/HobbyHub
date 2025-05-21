import React, { useEffect, useState } from "react";
import { useAuth } from "../Provider/useAuth";

const Mygroups = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch groups for the current user's email
        const res = await fetch(`http://localhost:3000/mygroups/${encodeURIComponent(user?.email || "")}`);
        const data = await res.json();
        // Only show groups where group.email matches user.email
        const filtered = Array.isArray(data) ? data.filter(g => g.email === user?.email) : [];
        setGroups(filtered);
      } catch (err) {
        setError(err.message);
        setGroups([]); // Defensive: ensure groups is always an array
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [user?.email]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {groups.length === 0 && <div className="col-span-full text-center">No groups found.</div>}
      {groups.map((group, idx) => (
        <div
          key={group.groupName + idx}
          className="bg-white dark:bg-dark-bg rounded-xl shadow p-4 flex flex-col items-start hover:shadow-lg transition cursor-pointer"
          onClick={() => window.location.href = `/my-group-details/${group._id}`}
        >
          <img
            src={group.imageUrl || "https://via.placeholder.com/300x160?text=No+Image"}
            alt={group.groupName}
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <div className="font-semibold text-lg mb-1">{group.groupName}</div>
          <div className="text-gray-500 text-xs mb-1">{group.hobbyCategory}</div>
          <div className="text-gray-500 text-xs mb-1">Host: {group.host}</div>
          <div className="text-gray-500 text-xs mb-1">Location: {group.location}</div>
          <div className="text-gray-500 text-xs mb-1">Date: {group.startDate}</div>
        </div>
      ))}
    </div>
  );
};

export default Mygroups;
