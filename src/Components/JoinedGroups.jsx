import React, { useEffect, useState } from "react";
import { useAuth } from "../Provider/useAuth";
import { useNavigate } from "react-router";

const JoinedGroups = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJoinedGroups = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://hobby-hub-server-site.vercel.app/joined-groups/${encodeURIComponent(user?.email || "")}`);
        if (!res.ok) throw new Error("Failed to fetch joined groups");
        const data = await res.json();
        setGroups(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchJoinedGroups();
  }, [user?.email]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!groups.length) return <div className="p-8 text-center">No joined groups found.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {groups.map((group, idx) => (
        <div
          key={group._id || group.groupName + idx}
          className="bg-white dark:bg-dark-bg rounded-xl shadow p-4 flex flex-col items-start hover:shadow-lg transition cursor-pointer"
          onClick={() => navigate(`/group/${encodeURIComponent(group.groupName)}`)}
        >
          <img
            src={group.imageUrl || "https://via.placeholder.com/300x160?text=No+Image"}
            alt={group.groupName}
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <div className="font-semibold text-lg mb-1">{group.groupName}</div>
        </div>
      ))}
    </div>
  );
};

export default JoinedGroups;
