import React, { useEffect, useState, useCallback, useRef } from "react";
import gsap from "gsap";
import JoinedGroups from "../Components/JoinedGroups";
import { useNavigate } from "react-router";
import { useAuth } from "../Provider/useAuth";
import { VscFeedback } from "react-icons/vsc";
import { GoFileSubmodule } from "react-icons/go";
import { BsCalendar2EventFill } from "react-icons/bs";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdDashboardCustomize, MdGroupAdd } from "react-icons/md";

const DashBoard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [myGroups, setMyGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard"); // To track which section is active
  const sidebarRef = useRef(null);
  const mainRef = useRef(null);

  const fetchMyGroups = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://hobby-hub-server-site.vercel.app/mygroups/${encodeURIComponent(
          user?.email || ""
        )}`
      );
      const data = await res.json();
      setMyGroups(Array.isArray(data) ? data : []);
      setActiveSection("dashboard");
    } catch {
      setError("Failed to load my groups");
      setMyGroups([]);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  const fetchAllGroups = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // Updated to use the mygroups endpoint instead of groups
      const res = await fetch("https://hobby-hub-server-site.vercel.app/mygroups");
      const data = await res.json();
      setMyGroups(Array.isArray(data) ? data : []);
      setActiveSection("groups");
    } catch {
      setError("Failed to load all groups");
      setMyGroups([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.email) fetchMyGroups();
  }, [user?.email, fetchMyGroups]);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, delay: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-6 bg-light-section dark:bg-dark-bg transition-colors duration-300 mt-16 sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto">
      <div className="flex flex-row gap-4 md:gap-6 h-[calc(100vh-7rem)]">
        {/* Sidebar - now stays on side for all screen sizes */}
        <aside
          ref={sidebarRef}
          className="w-16 md:w-64 h-full bg-gradient-to-b from-light-card to-light-bg/90 dark:from-dark-surface dark:to-dark-bg/90 flex flex-col justify-between py-4 md:py-8 px-1 md:px-4 transition-colors duration-300 shadow-xl z-10 rounded-2xl border border-gray-100/50 dark:border-gray-700/50"
        >
          <div className="flex flex-col items-center md:items-start gap-3 md:mb-8">
            {/* Logo or icon always visible */}
            <div className="w-10 h-10 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center text-primary dark:text-primary-light">
              <MdDashboardCustomize className="text-xl" />
            </div>
            {/* Dashboard label: only show on md+ screens */}
            <span className="hidden md:block font-semibold text-light-text dark:text-dark-text">
              Dashboard
            </span>
          </div>

          <nav className="flex flex-col gap-4 mt-8 text-gray-600 dark:text-gray-300 items-center md:items-start">
            <SidebarItem
              icon={<MdDashboardCustomize className="text-xl" />}
              label="Dashboard"
              isActive={activeSection === "dashboard"}
              onClick={fetchMyGroups}
            />
            <SidebarItem
              icon={<HiMiniUserGroup className="text-xl" />}
              label="Groups"
              isActive={activeSection === "groups"}
              onClick={fetchAllGroups}
            />
            <SidebarItem
              icon={<BsCalendar2EventFill className="text-xl" />}
              label="Events"
            />
            <SidebarItem
              icon={<GoFileSubmodule className="text-xl" />}
              label="Files"
            />
            <SidebarItem
              icon={<VscFeedback className="text-xl" />}
              label="Feedback"
            />
          </nav>

          <div className="mt-auto mb-2 w-full flex justify-center">
            <button
              className="w-10 h-10 md:w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full transition text-base shadow flex items-center justify-center gap-1"
              onClick={() => navigate("/create-group")}
            >
              <MdGroupAdd className="text-xl md:text-lg" />
              <span className="hidden md:inline">Create Group</span>
            </button>
          </div>
        </aside>

        {/* Main Panel */}
        <main
          ref={mainRef}
          data-scroll-container
          className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 bg-light-bg dark:bg-dark-bg overflow-y-auto rounded-2xl shadow-md border border-gray-100/50 dark:border-gray-700/50"
        >
          {" "}
          <section>
            <h1 className="text-2xl font-bold mb-6 bg-white/50 dark:bg-gray-800/50 shadow-sm rounded-lg px-5 py-2 inline-block text-light-text dark:text-dark-text">
              {activeSection === "dashboard" ? "Dashboard" : "All Groups"}
            </h1>
            <h4 className="text-xl font-semibold text-light-text dark:text-dark-text mb-6 mt-8 px-1">
              {activeSection === "dashboard" ? "My Groups" : "All Groups"}
            </h4>
            {loading ? (
              <div className="text-center text-gray-500 dark:text-gray-300">
                Loading...
              </div>
            ) : error ? (
              <div className="text-center text-red-500 dark:text-red-400">
                {error}
              </div>
            ) : myGroups.length === 0 ? (
              <div className="text-center text-gray-400 dark:text-gray-500">
                No groups found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
                {myGroups.map((group, idx) => (
                  <div
                    key={group._id || group.groupName + idx}
                    className="bg-white rounded-xl shadow p-4 flex flex-col items-start hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/my-group-details/${group._id}`)}
                  >
                    <img
                      src={
                        group.imageUrl ||
                        "https://via.placeholder.com/300x160?text=No+Image"
                      }
                      alt={group.groupName}
                      className="w-full h-32 object-cover rounded-lg mb-2 text-gray-800"
                    />
                    <div className="font-semibold text-lg mb-1 text-gray-900  ">
                      {group.groupName}
                    </div>
                    <div className="text-gray-400 text-xs mb-1">
                      {group.hobbyCategory}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          {activeSection === "dashboard" && (
            <section>
              <h4 className="text-xl font-semibold text-light-text dark:text-dark-text mb-6 mt-8 px-1">
                Joined Groups
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                <JoinedGroupsCardGrid />
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick, isActive = false }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-center md:justify-start w-full gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 group ${
      isActive ? "bg-blue-100 dark:bg-gray-700" : ""
    }`}
  >
    <div
      className={`flex items-center justify-center w-8 h-8 ${
        isActive
          ? "text-primary dark:text-primary-light"
          : "text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-light"
      }`}
    >
      {icon}
    </div>
    <span
      className={`hidden md:inline text-sm font-medium ${
        isActive ? "text-primary dark:text-primary-light" : ""
      }`}
    >
      {label}
    </span>
  </div>
);

const JoinedGroupsCardGrid = () => {
  const { user } = useAuth();
  const [groups, setGroups] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchJoinedGroups = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://hobby-hub-server-site.vercel.app/joined-groups/${encodeURIComponent(
            user?.email || ""
          )}`
        );
        if (!res.ok) throw new Error("Failed to fetch joined groups");
        const data = await res.json();
        setGroups(Array.isArray(data) ? data : []);
      } catch {
        setError("Failed to fetch joined groups");
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchJoinedGroups();
  }, [user?.email]);

  if (loading)
    return (
      <div className="text-center text-gray-500 dark:text-gray-300 col-span-4">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 dark:text-red-400 col-span-4">
        {error}
      </div>
    );
  if (!groups.length)
    return (
      <div className="text-center text-gray-400 dark:text-gray-500 col-span-4">
        No joined groups found.
      </div>
    );
  return groups.map((group, idx) => (
    <div
      key={group._id || group.groupName + idx}
      className="bg-white   rounded-xl shadow p-4 flex flex-col items-start hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/group/${encodeURIComponent(group.groupName)}`)}
    >
      <img
        src={
          group.imageUrl || "https://via.placeholder.com/300x160?text=No+Image"
        }
        alt={group.groupName}
        className="w-full h-32 object-cover rounded-lg mb-2"
      />
      <div className="font-semibold text-lg mb-1 text-gray-800  ">
        {group.groupName}
      </div>
      <div className="text-gray-400   text-xs mb-1">
        {group.hobbyCategory}
      </div>
    </div>
  ));
};

export default DashBoard;
