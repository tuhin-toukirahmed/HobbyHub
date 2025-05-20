import React, { useState, useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "../Provider/useAuth";
import { getAuth, sendEmailVerification } from "firebase/auth";

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  const [emailSent, setEmailSent] = useState(user?.emailVerified || false);
  const [activeTab, setActiveTab] = useState("about");
  const scrollRef = useRef(null);
  const revealRefs = useRef([]);

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

  // Personal Details content
  const personalDetails = (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">PERSONAL DETAILS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <div>
            <span className="font-semibold">Full Name:</span>{" "}
            {user?.displayName || "No Name"}
          </div>
          <div>
            <span className="font-semibold">Birth Date:</span> 19 May 1990
          </div>
          <div>
            <span className="font-semibold">Gender:</span> Male
          </div>
          <div>
            <span className="font-semibold">Preferred Language:</span> English
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=" +
                (user?.displayName || "User")
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-200 mb-2 object-cover"
          />
        </div>
      </div>
    </div>
  );

  // Contact content
  const contactDetails = (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">CONTACT</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            {user?.email || "No Email"}
          </div>
          <div>
            <span className="font-semibold">Phone Number:</span> (201) 555-5555
          </div>
          <div>
            <span className="font-semibold">Address:</span> Dhaka, Dhaka BGD
          </div>
        </div>
        <div>
          <div className="font-semibold mb-1">Emergency Contact</div>
          <div>
            <span className="font-semibold">Name:</span>{" "}
          </div>
          <div>
            <span className="font-semibold">Phone Number:</span> (201) 555-5555
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
          </div>
          <div>
            <span className="font-semibold">Notes:</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );

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
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  useEffect(() => {
    if (revealRefs.current.length) {
      revealRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.2,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      <div
        className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto bg-light-section dark:bg-dark-surface p-6 rounded-lg shadow mt-8"
        data-scroll-section
      >
        {/* Left: Profile Image and Basic Info */}
        <div
          className="bg-white dark:bg-dark-bg rounded-lg p-6 flex flex-col items-center w-full md:w-1/3 "
          ref={(el) => (revealRefs.current[0] = el)}
        >
          <img
            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=" +
                (user?.displayName || "User")
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
        <div className="flex-1" ref={(el) => (revealRefs.current[1] = el)}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Maybe Accepting Guests
              </h1>
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
              <button
                className={`pb-2 font-semibold ${
                  activeTab === "about"
                    ? "text-orange-600 border-b-2 border-orange-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About
              </button>
              <button
                className={`pb-2 font-semibold ${
                  activeTab === "groups"
                    ? "text-orange-600 border-b-2 border-orange-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("groups")}
              >
                My Groups
              </button>
              <button
                className={`pb-2 font-semibold ${
                  activeTab === "personal"
                    ? "text-orange-600 border-b-2 border-orange-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("personal")}
              >
                Personal Details
              </button>
              <button
                className={`pb-2 font-semibold ${
                  activeTab === "contact"
                    ? "text-orange-600 border-b-2 border-orange-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("contact")}
              >
                Contact
              </button>
            </nav>
          </div>
          {/* Tab Content */}
          <div ref={(el) => (revealRefs.current[2] = el)}>
            {activeTab === "about" && (
              <>
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
                    Couchsurfers decide whom to meet based on profiles! Until
                    you{" "}
                    <a href="#" className="text-blue-600 underline">
                      fill out your profile
                    </a>
                    , people won’t know what to expect and why they should hang
                    out with you.
                  </div>
                </div>
              </>
            )}
            {activeTab === "groups" && (
              <div className="mb-6">My Groups (to be updated)</div>
            )}
            {activeTab === "personal" && personalDetails}
            {activeTab === "contact" && contactDetails}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
