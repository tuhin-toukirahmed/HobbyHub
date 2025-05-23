import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router";
import LocomotiveScroll from "locomotive-scroll";
import { useAuth } from "../Provider/useAuth";
import { DataContext } from "../Provider/DataContext";
import { toast } from "react-hot-toast";

const MyGroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const { user } = useAuth();
  const { userEmail } = useContext(DataContext);
  const email = userEmail || user?.email || "";

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
        try { scroll.destroy(); } catch {/* ignore */}
      }
    };
  }, []);

  useEffect(() => {
    const fetchGroup = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://hobby-hub-server-site.vercel.app/mygroups/details/${encodeURIComponent(groupId)}`);
        if (!res.ok) {
          setGroup(null);
        } else {
          const data = await res.json();
          // Defensive: treat empty object or missing id as not found
          if (!data || Object.keys(data).length === 0 || !data._id) {
            setGroup(null);
          } else {
            setGroup(data);
          }
        }
      } catch {
        setGroup(null);
      } finally {
        setLoading(false);
      }
    };
    if (groupId) fetchGroup();
  }, [groupId]);

  // Delete group handler
  const handleDelete = async () => {
    if (!group?._id && !group?.id) {
      toast.error('Group ID not found.');
      return;
    }
    if (!email) {
      toast.error('User email not found.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        const groupIdToDelete = group._id || group.id || group.groupId;
        const res = await fetch(`https://hobby-hub-server-site.vercel.app/mygroups/${encodeURIComponent(groupIdToDelete)}/${encodeURIComponent(email)}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          const errorText = await res.text();
          toast.error(`Failed to delete group: ${errorText}`);
          return;
        }
        toast.success('Group deleted successfully!');
        window.location.href = '/my-groups';
      } catch (err) {
        toast.error('Delete error: ' + err.message);
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return (
    <div className="p-8 text-center text-red-600">
      {error}
      <div className="mt-4">
        <a href="/mygroups" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Back to My Groups</a>
      </div>
    </div>
  );
  if (!group) return (
    <div className="p-8 text-center">
      <div className="text-2xl font-semibold mb-2">No group details found</div>
      <div className="text-gray-500 mb-4">The group you are looking for does not exist or you do not have access.</div>
      <a href="/mygroups" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Back to My Groups</a>
    </div>
  );

  const host = group.host || "Unknown";
  const orientationFee = group.orientationFee || 0;
  const location = group.location || group.meetingLocation || "No Location found";
  const date = group.date || group.startDate || "Date not specified";
  const weeks = group.weeks || 1;
  const members = group.members || 1;
  const refundPolicy = "Full refund up to 48 hours before the class";
  const cancelPolicy = "No refunds after the class starts";
  const minAge = 18;

  return (
    <div ref={scrollRef} data-scroll-container className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-16 mb-10 dark:bg-dark-bg">
      <img
        src={group.imageUrl}
        alt={group.groupName}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div>
        <h1 className="text-3xl font-bold mb-2">{group.groupName}</h1>
        <div className="text-gray-500 mb-4">{group.hobbyCategory}</div>
        <div className="mb-2">Hosted by: {host}, {weeks} weeks, {members} members</div>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold mb-1">About this class</h2>
        <div className="mb-6 text-gray-700 dark:text-gray-300">{group.description}</div>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold mb-2">When</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <div className="text-gray-500">Date</div>
            <div>{date}</div>
          </div>
          <div>
            <div className="text-gray-500">Time</div>
            <div>10:00am - 12:00pm</div>
          </div>
          <div>
            <div className="text-gray-500">Duration</div>
            <div>2 hours</div>
          </div>
          <div>
            <div className="text-gray-500">Location</div>
            <div>{location}</div>
          </div>
        </div>
      </div>
      <button className="w-full bg-gray-100 py-2 rounded mb-6 font-medium text-gray-700 dark:bg-dark-surface dark:text-gray-200">
        View map
      </button>
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Cost</h2>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <div className="text-gray-500">Orientation fee</div>
            <div>${orientationFee}</div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Policies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
          <div>
            <div className="text-gray-500">Refund policy</div>
            <div>{refundPolicy}</div>
          </div>
          <div>
            <div className="text-gray-500">Cancellation policy</div>
            <div>{cancelPolicy}</div>
          </div>
          <div>
            <div className="text-gray-500">Age requirement</div>
            <div>Minimum age is {minAge}</div>
          </div>
        </div>
      </div>
      <button
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded text-lg transition"
        onClick={handleDelete}
      >
        Delete Group
      </button>
    </div>
  );
};

export default MyGroupDetails;