import React, { useState, useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "../Provider/useAuth";
import {
  getAuth,
  updateProfile,
  deleteUser,
  reauthenticateWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

gsap.registerPlugin(ScrollTrigger);

const Settings = () => {
  const scrollRef = useRef(null);
  const sectionRefs = useRef([]);
  const { user } = useAuth();
  const [form, setForm] = useState({
    username:
      user?.displayName?.toLowerCase().replace(/\s+/g, "-") || "username",
    firstName: user?.displayName?.split(" ")[0] || "",
    lastName: user?.displayName?.split(" ")[1] || "",
    birthday: { day: 19, month: "May", year: 1990 },
    gender: "Male",
    language: "English",
    phone: "",
    address: "Dhaka, Dhaka BGD",
    email: user?.email || "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyEmail: "",
    emergencyNotes: "",
    photoURL: user?.photoURL || "",
  });
  const [saving, setSaving] = useState(false);

  const isDark = document.documentElement.classList.contains("dark");
  const sectionBg = isDark ? "bg-dark-surface" : "bg-white";
  const inputBg = isDark
    ? "bg-dark-bg text-light-text"
    : "bg-light-bg text-dark-text";
  const border = isDark ? "border-dark-border" : "border-gray-200";

  // Initialize Locomotive Scroll
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

  useEffect(() => {
    if (sectionRefs.current.length) {
      sectionRefs.current.forEach((el, i) => {
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
      });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("birthday.")) {
      setForm((prev) => ({
        ...prev,
        birthday: { ...prev.birthday, [name.split(".")[1]]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Save handler
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const displayName = `${form.firstName} ${form.lastName}`.trim();
    try {
      await updateProfile(getAuth().currentUser, {
        displayName,
        photoURL: form.photoURL,
      });
      window.alert("Profile updated!");
    } catch (error) {
      window.alert("Error updating profile: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Add a reauthentication helper for delete
  const reauthenticateAndDelete = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(getAuth().currentUser, provider);
      await deleteUser(getAuth().currentUser);
      window.alert("Account deleted successfully.");
      window.location.href = "/";
    } catch (error) {
      window.alert("Error deleting account: " + error.message);
    }
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div ref={scrollRef} data-scroll-container>
      <div
        className={`max-w-2xl mx-auto mt-8 p-6 rounded-lg shadow ${
          isDark ? "bg-dark-bg" : "bg-light-section"
        }`}
        data-scroll-section
      >
        <h2 className="text-lg font-semibold mb-4">ACCOUNT DETAILS</h2>
        <form onSubmit={handleSave}>
          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            className={`rounded-lg p-6 mb-6 ${sectionBg} ${border} border`}
          >
            <div className="text-orange-600 font-semibold mb-2 text-sm">
              MY PERSONAL DETAILS
            </div>
            <div className="flex items-center mb-4">
              <span className="text-sm">Username </span>
              <input
                className={`ml-2 px-2 py-1 rounded border ${border} ${inputBg} w-48`}
                value={form.username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">First name</label>
                <input
                  className={`w-full px-2 py-1 rounded border ${border} ${inputBg}`}
                  value={form.firstName}
                  name="firstName"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last name</label>
                <input
                  className={`w-full px-2 py-1 rounded border ${border} ${inputBg}`}
                  value={form.lastName}
                  name="lastName"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Profile Photo URL</label>
              <input
                className={`w-full px-2 py-1 rounded border ${border} ${inputBg}`}
                value={form.photoURL}
                name="photoURL"
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">Birthday</label>
                <div className="flex gap-1">
                  <select
                    className={`rounded border ${border} ${inputBg}`}
                    value={form.birthday.day}
                    name="birthday.day"
                    onChange={handleChange}
                  >
                    {[...Array(31)].map((_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <select
                    className={`rounded border ${border} ${inputBg}`}
                    value={form.birthday.month}
                    name="birthday.month"
                    onChange={handleChange}
                  >
                    {months.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    className={`rounded border ${border} ${inputBg}`}
                    value={form.birthday.year}
                    name="birthday.year"
                    onChange={handleChange}
                  >
                    {Array.from({ length: 100 }, (_, i) => 2025 - i).map(
                      (y) => (
                        <option key={y}>{y}</option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Gender</label>
                <select
                  className={`w-full rounded border ${border} ${inputBg}`}
                  value={form.gender}
                  name="gender"
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Preferred Language</label>
                <select
                  className={`w-full rounded border ${border} ${inputBg}`}
                  value={form.language}
                  name="language"
                  onChange={handleChange}
                >
                  <option>English</option>
                  <option>Bengali</option>
                  <option>Hindi</option>
                </select>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              We'll send you messages in this language.
            </div>
          </div>
          <div
            ref={(el) => (sectionRefs.current[1] = el)}
            className={`rounded-lg p-6 mb-6 ${sectionBg} ${border} border`}
          >
            <div className="text-orange-600 font-semibold mb-2 text-sm">
              MY CONTACT DETAILS
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Phone</label>
              <div className="flex items-center gap-2">
                <span className="text-lg">🇺🇸</span>
                <input
                  className={`w-full px-2 py-1 rounded border ${border} ${inputBg}`}
                  value={form.phone}
                  name="phone"
                  onChange={handleChange}
                  placeholder="(201) 555-5555"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Home Address</label>
              <div className="text-sm">Dhaka, Bangladesh</div>
              <div className="text-xs text-blue-600 cursor-pointer">
                Public Profile Location: Dhaka, Dhaka, Bangladesh
              </div>
              <div className="text-xs text-blue-600 cursor-pointer">
                Edit your Address
              </div>
            </div>
          </div>
          <div
            ref={(el) => (sectionRefs.current[2] = el)}
            className={`rounded-lg p-6 mb-6 ${sectionBg} ${border} border`}
          >
            <div className="text-orange-600 font-semibold mb-2 text-sm flex items-center gap-1">
              ACCOUNT DETAILS <span className="ml-1">🔒</span>
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Email</label>
              <div className="flex   gap-2 flex-col items-start">
                <span>{form.email}</span>
                <div className="flex gap-2 flex-col ">
                  <span className="text-blue-600 text-xs cursor-pointer">
                    Confirm My Email
                  </span>
                  <span className="text-blue-600 text-xs cursor-pointer">
                    Change My Email
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Password</label>
              <span className="text-blue-600 text-xs cursor-pointer">
                Change My Password
              </span>
            </div>
          </div>
          <div
            ref={(el) => (sectionRefs.current[3] = el)}
            className={`rounded-lg p-6 mb-6 ${sectionBg} ${border} border`}
          >
            <div className="text-orange-600 font-semibold mb-2 text-sm flex items-center gap-1">
              EMERGENCY CONTACT <span className="ml-1">🔒</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">
              You give us permission to notify this person if we believe you
              were involved in an emergency and to share information about your
              activity and location with them if requested.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  className={`w-full px-2 py-1 rounded border ${border} ${inputBg}`}
                  value={form.emergencyName}
                  name="emergencyName"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇺🇸</span>
                  <input
                    className={`w-full px-2 py-1 rounded border ${border} ${inputBg}`}
                    value={form.emergencyPhone}
                    name="emergencyPhone"
                    onChange={handleChange}
                    placeholder="(201) 555-5555"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  className={`w-full px-2 py-1 rounded border ${border} ${inputBg}`}
                  value={form.emergencyEmail}
                  name="emergencyEmail"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Notes</label>
                <input
                  className={`w-full px-2 py-1 rounded border ${border} ${inputBg}`}
                  value={form.emergencyNotes}
                  name="emergencyNotes"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={reauthenticateAndDelete}
              className="text-blue-600 text-xs"
              type="button"
            >
              Deactivate My Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
