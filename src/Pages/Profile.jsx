import React, { useState, useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "../Provider/useAuth";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  const [emailSent, setEmailSent] = useState(user?.emailVerified || false);
  const [activeTab, setActiveTab] = useState("about");
  const [form, setForm] = useState({
    username: user?.displayName?.toLowerCase().replace(/\s+/g, "-") || "username",
    firstName: user?.displayName?.split(" ")[0] || "",
    lastName: user?.displayName?.split(" ")[1] || "",
    birthday:  user?.birthday || "",
    gender: user?.gender || "Male",
    language: user?.language || "English",
    phone: user?.phone || "",
    address: user?.address || " ",
    email: user?.email || "",
    emergencyName: user?.emergencyName || "",
    emergencyPhone: user?.emergencyPhone || "",
    emergencyEmail: user?.emergencyEmail || "",
    emergencyNotes: user?.emergencyNotes || "",
    photoURL: user?.photoURL || "",
  });
  const [userGroups, setUserGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsError, setGroupsError] = useState("");
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

  const personalDetails = (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">PERSONAL DETAILS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <div>
            <span className="font-semibold">Full Name:</span>{" "}
            {form.firstName || form.lastName ? `${form.firstName} ${form.lastName}` : form.username || "No Name"}
          </div>
          <div>
            <span className="font-semibold">Birth Date:</span>{" "}
            {form.birthday?.day && form.birthday?.month && form.birthday?.year ? `${form.birthday.day} ${form.birthday.month} ${form.birthday.year}` : "Not set"}
          </div>
          <div>
            <span className="font-semibold">Gender:</span> {form.gender || "Not set"}
          </div>
          <div>
            <span className="font-semibold">Preferred Language:</span> {form.language || "Not set"}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={form.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(form.firstName || form.username || "User")}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-200 mb-2 object-cover"
          />
        </div>
      </div>
    </div>
  );

  const contactDetails = (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">CONTACT</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            {form.email || "No Email"}
          </div>
          <div>
            <span className="font-semibold">Phone Number:</span> {form.phone || "Not set"}
          </div>
          <div>
            <span className="font-semibold">Address:</span> {form.address || "Not set"}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-1">Emergency Contact</div>
          <div>
            <span className="font-semibold">Name:</span> {form.emergencyName || "Not set"}
          </div>
          <div>
            <span className="font-semibold">Phone Number:</span> {form.emergencyPhone || "Not set"}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {form.emergencyEmail || "Not set"}
          </div>
          <div>
            <span className="font-semibold">Notes:</span> {form.emergencyNotes || "Not set"}
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

  // Fetch user profile from backend and update form state
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`http://localhost:3000/users/${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        // Defensive: merge backend data with current form (for missing fields)
        setForm(prev => ({ ...prev, ...data }));
      } catch (err) {
        // Optionally handle error (e.g., show a message)
        // For now, ignore and use default form
      }
    };
    fetchProfile();
    // Only run when user.email changes
  }, [user?.email]);

  // Fetch user's groups from backend
  useEffect(() => {
    const fetchUserGroups = async () => {
      if (!user?.email) return;
      setGroupsLoading(true);
      setGroupsError("");
      try {
        const res = await fetch(`http://localhost:3000/mygroups/${encodeURIComponent(user.email)}`);
        const data = await res.json();
        // Only show groups where group.email matches user.email
        setUserGroups(Array.isArray(data) ? data.filter(g => g.email === user.email) : []);
      } catch (err) {
        setGroupsError("Failed to load groups");
        setUserGroups([]);
      } finally {
        setGroupsLoading(false);
      }
    };
    if (activeTab === "groups") fetchUserGroups();
  }, [user?.email, activeTab]);

  // Update group handler (navigate to update page or open modal)
  const handleUpdate = (group) => {
    // Example: navigate to update page (implement as needed)
    window.location.href = `/update-group/${encodeURIComponent(group.id || group._id || group.groupName)}`;
  };

  // Delete group handler
  const handleDelete = async (group) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      await fetch(`http://localhost:3000/mygroups/${encodeURIComponent(group.id || group._id || group.groupName)}`, {
        method: "DELETE"
      });
      setUserGroups(prev => prev.filter(g => (g.id || g._id || g.groupName) !== (group.id || group._id || group.groupName)));
    } catch {
      alert("Failed to delete group");
    }
  };

  return (
    <div ref={scrollRef} data-scroll-container>
      <div
        className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto bg-light-section dark:bg-dark-surface p-6 rounded-lg shadow mt-16"
        data-scroll-section
      >
        <div
          className="bg-white dark:bg-dark-bg rounded-lg p-6 flex flex-col items-center w-full md:w-1/3 "
          ref={(el) => (revealRefs.current[0] = el)}
        >
          <img
            src={form.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(form.firstName || form.username || "User")}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-200 mb-4 object-cover"
          />
          <h2 className="text-xl font-bold mb-1">
            {form.firstName || form.lastName ? `${form.firstName} ${form.lastName}` : form.username || "No Name"}
          </h2>
          <a href="#" className="text-blue-600 hover:underline text-sm mb-2">
            {form.email ? form.email : "No Email"}
          </a>
          <div className="text-gray-500 text-sm mb-4">
            {form.address || "Not set"}
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
              : "Verify Profile"}
          </button>
          <div className="text-xs text-gray-400 mt-2">
            Verified members find hosts faster
          </div>
        </div>
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
              <Link to="/settings">Edit My Profile</Link>
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
          <div ref={(el) => (revealRefs.current[2] = el)}>
            {activeTab === "about" && (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">OVERVIEW</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <div>0 references</div>
                      <div>No languages listed</div>
                        
                    </div>
                    <div>
                      <div>No occupation listed</div>
                      <div>No education listed</div>
                      <div>No hometown listed</div>
                       
                    </div>
                  </div>
                </div>
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
              <div className="mb-6">
                {groupsLoading ? (
                  <div>Loading groups...</div>
                ) : groupsError ? (
                  <div className="text-red-500">{groupsError}</div>
                ) : userGroups.length === 0 ? (
                  <div>No groups found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
                      <thead className="bg-gray-100 dark:bg-dark-surface">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-dark-bg divide-y divide-gray-200 dark:divide-dark-border">
                        {userGroups.map((group, idx) => (
                          <tr key={group.groupName + idx}>
                            <td className="px-4 py-2">
                              <img
                                src={group.imageUrl || "https://via.placeholder.com/80x40?text=No+Image"}
                                alt={group.groupName}
                                className="w-20 h-12 object-cover rounded"
                              />
                            </td>
                            <td className="px-4 py-2 font-semibold">{group.groupName}</td>
                            <td className="px-4 py-2">{group.startDate || group.date || "-"}</td>
                            <td className="px-4 py-2">
                              <button className="btn btn-xs btn-warning mr-2" onClick={() => handleUpdate(group)}>Update</button>
                              <button className="btn btn-xs btn-error" onClick={() => handleDelete(group)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
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
