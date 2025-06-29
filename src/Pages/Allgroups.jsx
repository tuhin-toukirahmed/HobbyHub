import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typewriter } from "react-simple-typewriter";

gsap.registerPlugin(ScrollTrigger);

const GROUPS_PER_PAGE = 16;

const Allgroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const h1Ref = useRef(null);

  const categories = [
    "Photography",
    "Cooking",
    "Painting",
    "Cycling",
    "Gardening",
    "Music",
    "Coding",
    "Traveling",
    "Reading",
    "Writing",
    "Hiking",
    "Dancing",
    "Yoga",
    "Chess",
    "Pottery",
  ];

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
         }
      }
    };
  }, []);

  useEffect(() => {
    // Animate h1 from left
    if (h1Ref.current) {
      gsap.fromTo(
        h1Ref.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.8, delay: 0.2, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (cardRefs.current.length) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      cardRefs.current.forEach((el, idx) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, filter: "blur(6px)" },
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power3.int",
              delay: idx * 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        }
      });
      ScrollTrigger.refresh();
    }
  }, [groups]);

  // Reset page to 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = `https://hobby-hub-server-site.vercel.app/allgroups`;
     if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    } else {
      url += `?page=${page}&limit=${GROUPS_PER_PAGE}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let filtered = data.groups || [];
        setGroups(filtered);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch groups");
        setLoading(false);
      });
  }, [page, category]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading Groups</h2>
          <p className="text-gray-500">Finding amazing hobby groups for you...</p>
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto mt-20"
    >
      <div className="px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-1">
          <h1 ref={h1Ref} className="text-3xl font-bold mb-6">
            Find a Group for{" "} <br className="block lg:hidden"/>
            <span style={{ color: "#10b981" }} className="">
              <Typewriter
                words={categories}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1200}
              />
            </span>
          </h1>
        </div>
        <div className="w-full md:w-54 ">
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="" className="text-gray-800">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="text-gray-800">
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div></div>
      </div>
      <div className="flex gap-3 mb-8 flex-wrap"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {groups.map((group, idx) => (
          <div
            key={group.groupName + idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-start hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/group/${group._id}`)}
          >
            <img
              src={
                group.imageUrl ||
                "https://via.placeholder.com/300x160?text=No+Image"
              }
              alt={group.groupName}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <div className="font-semibold text-lg mb-1 dark:text-gray-800">
              {group.groupName}
            </div>
            <div className="text-gray-500 text-xs mb-1">
              {group.hobbyCategory}
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      {!category && totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-black font-semibold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-2 cursor-pointer rounded-full font-semibold mx-1 ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 rounded bg-gray-200 text-black font-semibold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Allgroups;
