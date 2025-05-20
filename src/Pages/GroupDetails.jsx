import React, { useContext } from "react";
import { useParams } from "react-router";
import { DataContext } from "../Provider/DataContext.js";

const GroupDetails = () => {
  const { groupName } = useParams();
  const { groups } = useContext(DataContext);
  const group = groups.find(
    (g) => g.groupName && decodeURIComponent(groupName) === g.groupName
  );

  if (!group) return <div className="p-8 text-center">Group not found.</div>;

  // Use dynamic data from group
  const host = group.host || "Unknown";
  const orientationFee = group.orientationFee || 0;
  const location = group.location || group.meetingLocation || "TBD";
  const date = group.date || "TBD";
  const weeks = group.weeks || 1;
  const members = group.members || 1;
  const refundPolicy = "Full refund up to 48 hours before the class";
  const cancelPolicy = "No refunds after the class starts";
  const minAge = 18;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-16 mb-10">
      <img
        src={group.imageUrl}
        alt={group.groupName}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{group.groupName}</h1>
      <div className="text-gray-500 mb-4">
        Hosted by: {host}, {weeks} weeks, {members} members
      </div>
      <h2 className="font-semibold mb-1">About this class</h2>
      <div className="mb-6 text-gray-700">{group.description}</div>
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
      <button className="w-full bg-gray-100 py-2 rounded mb-6 font-medium text-gray-700">
        View map
      </button>
      <h2 className="font-semibold mb-2">Cost</h2>
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <div className="text-gray-500">Orientation fee</div>
          <div>${orientationFee}</div>
        </div>
      </div>
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
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded text-lg transition">
        Join group - ${orientationFee}
      </button>
    </div>
  );
};

export default GroupDetails;