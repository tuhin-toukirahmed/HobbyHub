import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import LocomotiveScroll from "locomotive-scroll";
import { useAuth } from "../Provider/useAuth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const GroupDetails = () => {
  const { _id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const revealRefs = useRef([]);
  const { user } = useAuth();
  const email = user?.email || "";
  const [joining, setJoining] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState("");
  const [joinError, setJoinError] = useState("");
  const [alreadyJoined, setAlreadyJoined] = useState(false);

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
        try {
          scroll.destroy();
        } catch {}
      }
    };
  }, []);

  // Only fetch if groupId is defined and not empty
  useEffect(() => {
    if (!_id) return;
    setLoading(true);
    fetch(`https://hobby-hub-server-site.vercel.app/allgroups/details/${_id}`)
      .then(async (res) => {
        if (!res.ok) {
          // Try to get error message from backend
          let errMsg = 'Failed to fetch group';
          try {
            const errData = await res.json();
            if (errData && errData.message) errMsg = errData.message;
          } catch {}
          throw new Error(errMsg);
        }
        return res.json();
      })
      .then((data) => {
        // If data is null/undefined or missing _id, treat as not found
        if (!data || (!data._id && !data.groupName)) {
          setGroup(null);
        } else {
          setGroup(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setGroup(null);
        setLoading(false);
      });
  }, [_id]);

  useEffect(() => {
    const checkJoined = async () => {
      if (!email || !group?.groupName) return;
      try {
        const res = await fetch(
          `https://hobby-hub-server-site.vercel.app/joined-groups/${encodeURIComponent(
            email
          )}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (
          Array.isArray(data) &&
          data.some((g) => g.groupName === group.groupName)
        ) {
          setAlreadyJoined(true);
        } else {
          setAlreadyJoined(false);
        }
      } catch {
       }
    };
    checkJoined();
  }, [email, group?.groupName, joinSuccess]);

  const handleJoinGroup = async () => {
    setJoinSuccess("");
    setJoinError("");
    if (!email) {
      toast.error("You must be logged in to join a group.");
      return;
    }
    
    // Use SweetAlert2 for confirmation
    const result = await Swal.fire({
      title: "Join Group",
      text: `Are you sure you want to join '${group.groupName}'?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, join it!",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    setJoining(true);
    try {
      const joinedGroupData = {
        ...group,
        originalGroupId: group._id, // Keep reference to original group
        email: email, // User who joined
        joinedAt: new Date(),
        _id: undefined // Let MongoDB generate new _id for joined group record
      };
      const res = await fetch(
        "https://hobby-hub-server-site.vercel.app/joined-groups",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(joinedGroupData),
        }
      );
      if (!res.ok) throw new Error("Failed to join group");
      setJoinSuccess("Successfully joined the group!");
      
      // Show success alert
      await Swal.fire({
        title: "Joined!",
        text: "You have successfully joined the group.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      setJoinError(err.message || "Failed to join group");
      
      // Show error alert
      Swal.fire({
        title: "Error!",
        text: err.message || "Failed to join group",
        icon: "error",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setJoining(false);
    }
  };

  if (loading) 
    return (
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading Group Details</h2>
          <p className="text-gray-500">Getting all the information about this group...</p>
        </div>
      </div>
    );
  if (!group) 
    return (
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Group Not Found</h2>
          <p className="text-gray-500">Sorry, we couldn't find the group you're looking for.</p>
        </div>
      </div>
    );

  const host = group.host || "Unknown";
  const orientationFee = group.orientationFee || 0;
  const location =
    group.location || group.meetingLocation || "No Location found";
  const startDate = group.startDate || "Date not specified";
  const weeks = group.weeks || 1;
  const members = group.members || 1;
  const refundPolicy = "Full refund up to 48 hours before the class";
  const cancelPolicy = "No refunds after the class starts";
  const minAge = 18;

  let isAvailable = true;
  if (group.startDate) {
    const today = new Date();
    const groupDate = new Date(group.startDate);
    isAvailable = groupDate >= today;
  }

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-16 mb-10"
    >
      <img
        src={group.imageUrl}
        alt={group.groupName}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div ref={(el) => (revealRefs.current[1] = el)}>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          {group.groupName}
        </h1>
        <div className="text-gray-500 mb-4">
          Hosted by: {host}, {weeks} weeks, {members} members
        </div>
      </div>
      <div className="mb-6">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="font-semibold mb-1 text-gray-900">About this class</h2>
          {group.startDate &&
            (isAvailable ? (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-300">
                Available
              </span>
            ) : (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-300">
                Unavailable
              </span>
            ))}
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
              className="w-full bg-gray-400 text-white font-bold py-3 rounded text-lg cursor-not-allowed"
              disabled
            >
              Already Joined ✓
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
          {joinSuccess && (
            <div className="text-green-600 mt-2 dark:text-green-400">
              {joinSuccess}
            </div>
          )}
          {joinError && (
            <div className="text-red-500 mt-2 dark:text-red-400">
              {joinError}
            </div>
          )}
        </>
      )}
      {!isAvailable && (
        <button
          className="w-full bg-gray-300 text-gray-500 font-bold py-3 rounded text-lg cursor-not-allowed"
          disabled
        >
          Not available
        </button>
      )}
    </div>
  );
};

export default GroupDetails;
