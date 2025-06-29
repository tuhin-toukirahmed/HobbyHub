import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import LocomotiveScroll from "locomotive-scroll";
import { useAuth } from "../Provider/useAuth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const JoinedGroupDetails = () => {
  const { joinedGroupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const revealRefs = useRef([]);
  const { user } = useAuth();
  const email = user?.email || "";
  const [removing, setRemoving] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState("");
  const [removeError, setRemoveError] = useState("");

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

  // Fetch joined group details
  useEffect(() => {
    if (!joinedGroupId || !email) return;
    
    
    
    setLoading(true);
    const apiUrl = `https://hobby-hub-server-site.vercel.app/joined-groups/details/${joinedGroupId}/${encodeURIComponent(email)}`;
     
    fetch(apiUrl)
      .then(async (res) => {
         if (!res.ok) {
          let errMsg = 'Failed to fetch joined group details';
          try {
            const errData = await res.json();
             if (errData && errData.message) errMsg = errData.message;
          } catch (e) {
           }
          throw new Error(errMsg);
        }
        return res.json();
      })
      .then((data) => {
         if (!data || !data.groupName) {
           setGroup(null);
        } else {
           setGroup(data);
        }
        setLoading(false);
      })
      .catch((error) => {
         setGroup(null);
        setLoading(false);
      });
  }, [joinedGroupId, email]);

  const handleRemoveGroup = async () => {
    if (!email || !group?.groupName) return;
    
    // Use SweetAlert2 for confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove '${group.groupName}' from your joined groups?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    setRemoving(true);
    setRemoveError("");
    setRemoveSuccess("");
    try {
      const res = await fetch(
        `https://hobby-hub-server-site.vercel.app/joined-groups/${joinedGroupId}/${email}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to remove group");
      }
      setRemoveSuccess("Group removed from your joined groups.");
      
      // Show success alert
      await Swal.fire({
        title: "Removed!",
        text: "Group has been removed from your joined groups.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      
      // Navigate to dashboard after successful removal
      navigate("/dashboard");
    } catch (err) {
      setRemoveError(err.message || "Failed to remove group");
      
      // Show error alert
      Swal.fire({
        title: "Error!",
        text: err.message || "Failed to remove group",
        icon: "error",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setRemoving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!group) return <div className="p-8 text-center">Joined group not found.</div>;

  const host = group.host || "Unknown";
  const orientationFee = group.orientationFee || 0;
  const location =
    group.location || group.meetingLocation || "No Location found";
  const startDate = group.startDate || "Date not specified";
  const weeks = group.weeks || 1;
  const members = group.members || 1;
  const joinedAt = group.joinedAt ? new Date(group.joinedAt).toLocaleDateString() : "Unknown";
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
        <div className="text-green-600 mb-4 font-semibold">
          ✅ You joined this group on {joinedAt}
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
      
      <button
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded text-lg transition"
        onClick={handleRemoveGroup}
        disabled={removing}
      >
        {removing ? "Removing..." : "Remove from joined groups"}
      </button>
      
      {removeSuccess && (
        <div className="text-green-600 mt-2 dark:text-green-400">
          {removeSuccess}
        </div>
      )}
      {removeError && (
        <div className="text-red-500 mt-2 dark:text-red-400">
          {removeError}
        </div>
      )}
    </div>
  );
};

export default JoinedGroupDetails;
