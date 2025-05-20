import React, { useState } from "react";
import { useAuth } from "../Provider/useAuth";
import { getAuth, sendEmailVerification } from "firebase/auth";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  const [emailSent, setEmailSent] = useState(user?.emailVerified || false);

  const handleVerify = async () => {
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(getAuth().currentUser);
        setEmailSent(true);
      } catch (err) {
        alert("Failed to send verification email: " + err.message);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto bg-light-section dark:bg-dark-surface p-6 rounded-lg shadow mt-8">
      {/* Left: Profile Image and Basic Info */}
      <div className="bg-white dark:bg-dark-bg rounded-lg p-6 flex flex-col items-center w-full md:w-1/3 ">
        <img
          src={
            user?.photoURL ||
            "https://ui-avatars.com/api/?name=" + (user?.displayName || "User")
          }
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-gray-200 mb-4 object-cover"
        />
        <h2 className="text-xl font-bold mb-1">
          {user?.displayName || "No Name"}
        </h2>
        <a href="#" className="text-blue-600 hover:underline text-sm mb-2">
          {user?.email ? user.email : "No Email"}
        </a>
        <div className="text-gray-500 text-sm mb-4">
          Dhaka, Dhaka, Bangladesh
        </div>
        {emailSent || user?.emailVerified ? (
          <div className="bg-green-100 dark:bg-green-900 rounded p-3 w-full text-center text-green-700 dark:text-green-200 text-xs mb-4">
            Profile Verified
            <ul className="mt-2 space-y-1 flex flex-col items-start">
              <li>• Email verified</li>
              <li>• Payment verified</li>
              <li>• Phone verified</li>
              <li>• Government ID verified</li>
            </ul>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-dark-surface rounded p-3 w-full text-center text-gray-600 text-xs mb-4">
            Profile not Verified
            <ul className="mt-2 space-y-1 flex flex-col items-start">
              <li>• Payment not verified</li>
              <li>• Phone not verified</li>
              <li>• Government ID not verified</li>
            </ul>
          </div>
        )}
        <button
          className="btn btn-success w-full"
          onClick={handleVerify}
          disabled={emailSent || user?.emailVerified}
        >
          {emailSent || user?.emailVerified
            ? "Verified"
            : "Upgrade to Verify Profile"}
        </button>
        <div className="text-xs text-gray-400 mt-2">
          Verified members find hosts faster
        </div>
      </div>
      {/* Right: Main Profile Content */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Maybe Accepting Guests</h1>
            <div className="text-xs text-gray-500">
              Last login less than a minute ago
            </div>
          </div>
          <button className="btn btn-primary mt-2 md:mt-0">
            Edit My Profile
          </button>
        </div>
        <div className="border-b border-gray-200 dark:border-dark-border mb-4">
          <nav className="flex gap-6 text-sm">
            <span className="text-orange-600 font-semibold border-b-2 border-orange-500 pb-2">
              About
            </span>
            <span className="text-gray-500 pb-2">My Home</span>
            <span className="text-gray-500 pb-2">
              Photos{" "}
              <span className="bg-blue-100 text-blue-600 rounded px-2">0</span>
            </span>
            <span className="text-gray-500 pb-2">
              References{" "}
              <span className="bg-blue-100 text-blue-600 rounded px-2">0</span>
            </span>
            <span className="text-gray-500 pb-2">
              Friends{" "}
              <span className="bg-blue-100 text-blue-600 rounded px-2">0</span>
            </span>
            <span className="text-gray-500 pb-2">
              Favorites{" "}
              <span className="bg-blue-100 text-blue-600 rounded px-2">0</span>
            </span>
          </nav>
        </div>
        {/* Overview Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">OVERVIEW</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <div>0 references</div>
              <div>No languages listed</div>
              <div>35, Male</div>
              <div>
                Member since 2025{" "}
                <span className="bg-orange-100 text-orange-600 rounded px-2 ml-1">
                  New Member
                </span>
              </div>
            </div>
            <div>
              <div>No occupation listed</div>
              <div>No education listed</div>
              <div>No hometown listed</div>
              <div>
                <a href="#" className="text-blue-600 hover:underline">
                  Profile 5% complete
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* About Me Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">ABOUT ME</h2>
          <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded text-gray-500 text-sm">
            Couchsurfers decide whom to meet based on profiles! Until you{" "}
            <a href="#" className="text-blue-600 underline">
              fill out your profile
            </a>
            , people won’t know what to expect and why they should hang out with
            you.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
