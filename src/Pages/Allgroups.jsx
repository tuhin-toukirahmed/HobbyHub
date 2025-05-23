import React, { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "../Provider/DataContext.js";
import { useNavigate } from "react-router";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Allgroups = () => {
  const { groups, loading, error } = useContext(DataContext);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const h1Ref = useRef(null);

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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
  }, [showAll, groups]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredGroups = groups;

  const groupsToShow = showAll ? filteredGroups : filteredGroups.slice(0, 8);

  return (
    <div ref={scrollRef} data-scroll-container className="sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto mt-16">
      <h1 ref={h1Ref} className="text-3xl font-bold mb-6">Find a Group for Your Hobby</h1>
      <div className="flex gap-3 mb-8 flex-wrap">
       </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {groupsToShow.map((group, idx) => (
          <div
            key={group.groupName + idx}
            ref={el => cardRefs.current[idx] = el}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-start hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/group/${group.groupName}`)}
          >
            <img
              src={group.imageUrl || "https://via.placeholder.com/300x160?text=No+Image"}
              alt={group.groupName}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <div className="font-semibold text-lg mb-1 dark:text-gray-800">{group.groupName}</div>
            <div className="text-gray-500 text-xs mb-1">{group.hobbyCategory}</div>
          </div>
        ))}
      </div>
      {filteredGroups.length > 8 && !showAll && (
        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-2 rounded-full bg-gray-200 text-black font-semibold hover:bg-gray-300 transition"
            onClick={() => setShowAll(true)}
          >
            Show More
          </button>
        </div>
      )}
      {showAll && filteredGroups.length > 8 && (
        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-2 rounded-full bg-gray-200 text-black font-semibold hover:bg-gray-300 transition"
            onClick={() => setShowAll(false)}
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default Allgroups;
