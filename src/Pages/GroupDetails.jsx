import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { DataContext } from "../Provider/DataContext.js";
import LocomotiveScroll from "locomotive-scroll";
import { useAuth } from "../Provider/useAuth";
import { toast } from "react-hot-toast";

const GroupDetails = () => {
  const { groupName } = useParams();
  const { groups } = useContext(DataContext);
  const group = groups.find(
    (g) => g.groupName && decodeURIComponent(groupName) === g.groupName
  );

  const scrollRef = useRef(null);
  const revealRefs = useRef([]);
  const { user } = useAuth();
  const userEmail = user?.email || "";
  const [joining, setJoining] = React.useState(false);
  const [joinSuccess, setJoinSuccess] = React.useState("");
  const [joinError, setJoinError] = React.useState("");

  // Check if user already joined this group
  const [alreadyJoined, setAlreadyJoined] = React.useState(false);

  useEffect(() => {
    let scroll = null;
    if (scrollRef.current) {
      scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
      });
    }
    return () => {
      if (scroll && typeof scroll.destroy === "function") {
        try { scroll.destroy(); } catch { /* ignore */ }
      }
    };
  }, []);

  useEffect(() => {
    const checkJoined = async () => {
      if (!userEmail || !group?.groupName) return;
      try {
        const res = await fetch(`https://hobby-hub-server-site.vercel.app/joined-groups/${encodeURIComponent(userEmail)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && data.some(g => g.groupName === group.groupName)) {
          setAlreadyJoined(true);
        } else {
          setAlreadyJoined(false);
        }
      } catch {
        // ignore error
      }
    };
    checkJoined();
  }, [userEmail, group?.groupName, joinSuccess]);

  const handleJoinGroup = async () => {
    setJoinSuccess("");
    setJoinError("");
    if (!userEmail) {
      toast.error("You must be logged in to join a group.");
      return;
    }
    if (!window.confirm(`Are you sure you want to join '${group.groupName}'?`)) return;
    setJoining(true);
    try {
      const joinedGroupData = {
        ...group,
        joinedAt: new Date().toISOString(),
        email: userEmail,
      };
      const res = await fetch("https://hobby-hub-server-site.vercel.app/joined-groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(joinedGroupData),
      });
      if (!res.ok) throw new Error("Failed to join group");
      setJoinSuccess("Successfully joined the group!");
      toast.success("Successfully joined the group!");
    } catch (err) {
      setJoinError(err.message || "Failed to join group");
      toast.error(err.message || "Failed to join group");
    } finally {
      setJoining(false);
    }
  };

  const handleRemoveGroup = async () => {
    if (!userEmail || !group?.groupName) return;
    if (!window.confirm(`Are you sure you want to remove '${group.groupName}' from your joined groups?`)) return;
    setJoining(true);
    setJoinError("");
    setJoinSuccess("");
    try {
      // Fetch the joined group for this user and group name to get its _id
      const resFind = await fetch(`https://hobby-hub-server-site.vercel.app/joined-groups/${encodeURIComponent(userEmail)}`);
      if (!resFind.ok) throw new Error("Failed to find joined group");
      const data = await resFind.json();
      const joinedGroup = Array.isArray(data) ? data.find(g => g.groupName === group.groupName) : null;
      if (!joinedGroup || !joinedGroup._id) throw new Error("Joined group not found");
      // Now delete by _id and email
      const res = await fetch(`https://hobby-hub-server-site.vercel.app/joined-groups/${joinedGroup._id}/${encodeURIComponent(userEmail)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove group");
      setJoinSuccess("Group removed from your joined groups.");
      setAlreadyJoined(false);
    } catch (err) {
      setJoinError(err.message || "Failed to remove group");
    } finally {
      setJoining(false);
    }
  };

  if (!group) return <div className="p-8 text-center">Group not found.</div>;

  const host = group.host || "Unknown";
  const orientationFee = group.orientationFee || 0;
  const location = group.location || group.meetingLocation || "No Location found";
  const startDate = group.startDate || "Date not specified";
  const weeks = group.weeks || 1;
  const members = group.members || 1;
  const refundPolicy = "Full refund up to 48 hours before the class";
  const cancelPolicy = "No refunds after the class starts";
  const minAge = 18;

  // Date availability badge logic
  let isAvailable = true;
  if (group.startDate) {
    const today = new Date();
    const groupDate = new Date(group.startDate);
    isAvailable = groupDate >= today;
  }

  return (
    <div ref={scrollRef} data-scroll-container className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-16 mb-10">
      <img
        src={group.imageUrl}
        alt={group.groupName}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div ref={el => (revealRefs.current[1] = el)}>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{group.groupName}</h1>
        <div className="text-gray-500 mb-4">
          Hosted by: {host}, {weeks} weeks, {members} members
        </div>
      </div>
      <div className="mb-6">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="font-semibold mb-1 text-gray-900">About this class</h2>
          {group.startDate && (
            isAvailable ? (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-300">Available</span>
            ) : (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-300">Unavailable</span>
            )
          )}
        </div>
        <div className="mb-6 text-gray-700">{group.description}</div>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold mb-2 text-gray-900">When</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <div className="text-gray-500 ">Date</div>
            <div className="text-gray-900">{startDate}</div>
          </div>
          <div>
            <div className="text-gray-500">Time</div>
            <div className="text-gray-900">10:00am - 12:00pm</div>
          </div>
          <div>
            <div className="text-gray-500">Duration</div>
            <div className="text-gray-900">2 hours</div>
          </div>
          <div>
            <div className="text-gray-500">Location</div>
            <div className="text-gray-900">{location}</div>
          </div>
        </div>
      </div>
      <button className="w-full bg-gray-100 py-2 rounded mb-6 font-medium text-gray-700">
        View map
      </button>
      <div className="mb-6">
        <h2 className="font-semibold mb-2 text-gray-900">Cost</h2>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <div className="text-gray-500">Orientation fee</div>
            <div className="text-gray-900">${orientationFee}</div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold mb-2 text-gray-900">Policies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
          <div>
            <div className="text-gray-500">Refund policy</div>
            <div className="text-gray-900">{refundPolicy}</div>
          </div>
          <div>
            <div className="text-gray-500">Cancellation policy</div>
            <div className="text-gray-900">{cancelPolicy}</div>
          </div>
          <div>
            <div className="text-gray-500">Age requirement</div>
            <div className="text-gray-900">Minimum age is {minAge}</div>
          </div>
        </div>
      </div>
      {isAvailable && (
        <>
          {alreadyJoined ? (
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded text-lg transition"
              onClick={handleRemoveGroup}
              disabled={joining}
            >
              {joining ? "Removing..." : "Remove group"}
            </button>
          ) : (
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded text-lg transition"
              onClick={handleJoinGroup}
              disabled={joining}
            >
              {joining ? "Joining..." : `Join group - $${orientationFee}`}
            </button>
          )}
          {joinSuccess && <div className="text-green-600 mt-2 dark:text-green-400">{joinSuccess}</div>}
          {joinError && <div className="text-red-500 mt-2 dark:text-red-400">{joinError}</div>}
        </>
      )}
    </div>
  );
};

export default GroupDetails;