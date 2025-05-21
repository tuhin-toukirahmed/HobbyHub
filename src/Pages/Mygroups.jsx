import React, { useEffect, useState } from "react";

const Mygroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:3000/mygroups");
         const data = await res.json();
         setGroups(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setGroups([]); // Defensive: ensure groups is always an array
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {groups.length === 0 && <div className="col-span-full text-center">No groups found.</div>}
      {groups.map((group, idx) => (
        <div key={group.groupName + idx} className="bg-white dark:bg-dark-bg rounded-xl shadow p-4 flex flex-col items-start hover:shadow-lg transition">
          <img
            src={group.imageUrl || "https://via.placeholder.com/300x160?text=No+Image"}
            alt={group.groupName}
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <div className="font-semibold text-lg mb-1">{group.groupName}</div>
          <div className="text-gray-500 text-xs mb-1">{group.hobbyCategory}</div>
          <div className="text-gray-500 text-xs mb-1">Host: {group.host}</div>
          <div className="text-gray-500 text-xs mb-1">Location: {group.location}</div>
          <div className="text-gray-500 text-xs mb-1">Date: {group.date}</div>
        </div>
      ))}
    </div>
  );
};

export default Mygroups;
