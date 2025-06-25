import React, { useEffect, useRef, useState } from "react";
import Hero from "../Components/Hero";
import BgImage from "../Components/BgImage";
import LocomotiveScroll from "locomotive-scroll";
import "../locomotive.css";
import PopularGroups from "../Components/PopularGroups";
import Gallery from "../Components/Gallery";
import Footer from "../Components/Footer";
import Reviews from "../Components/Reviews";
import Faq from "../Components/Faq";
import Brands from "../Components/Brands";
  
const Home = () => {
  const scrollRef = useRef(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
     const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);

     const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setTheme(
            document.documentElement.getAttribute("data-theme") || "light"
          );
        }
      });
    });

     observer.observe(document.documentElement, { attributes: true });

     return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let scroll = null;
    let handleResize = () => {};
    let handleScroll = () => {};  
    if (scrollRef.current) {
      scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        smoothMobile: true,
        multiplier: 0.8,
        lerp: 0.07,
        reloadOnContextChange: true,
        inertia: 0.6,
        getDirection: true,
        resetNativeScroll: false,
        scrollFromAnywhere: true,
        scrollbarClass: "locomotive-scrollbar",
        touchMultiplier: 2.5,
        useKeyboard: true,
        smartphone: {
          smooth: true,
          multiplier: 0.9,
        },
        tablet: {
          smooth: true,
          multiplier: 0.8,
        },
      });

      
      window.locomotive = scroll; 
      handleResize = () => {
        setTimeout(() => {
          scroll.update();
        }, 100);
      };
       setTimeout(() => {
        scroll.update();
      }, 500);
       setTimeout(() => {
        scroll.update();
      }, 1500);
       setTimeout(() => {
        scroll.update();
      }, 1500);
       setTimeout(() => {
        scroll.update();

         const popularGroupsSection = document.getElementById(
          "popular-groups-section"
        );
        if (popularGroupsSection) {
          scroll.scrollTo(popularGroupsSection, {
            offset: -50,
            duration: 0,
            disableLerp: true,
            callback: () => scroll.update(),
          });
          scroll.update();
        }

        // Force update for reviews section
        const reviewsSection = document.getElementById("reviews-section");
        if (reviewsSection) {
          setTimeout(() => {
            scroll.update();
          }, 200);
        }
      }, 3000);

      window.addEventListener("resize", handleResize);
       handleScroll = () => {
        if (scroll) {
          scroll.update();
        }
      };

      window.addEventListener("scroll", handleScroll);
    }

     return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.locomotive = null;

      if (scroll && typeof scroll.destroy === "function") {
        try {
          scroll.destroy();
        } catch (error) {
          console.error("Error destroying locomotive scroll:", error);
        }
      }
    };
  }, []);
  return (
    <div
      className={`overflow-hidden perspective-1000 ${
        theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white"
      }`}
      id="scroll-container"
      data-scroll-container
      ref={scrollRef}
    >
      <BgImage />
      <div className="content relative z-20">
        {" "}
        {/* Hero section */}
        <div
          className={`sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto`}
          data-scroll-section
          data-scroll-sticky
          data-scroll-target="#scroll-container"
        >
          <Hero />
        </div>
        {/* Gallery section with reveal animations */}
        <div
          className={`${theme === "light" ? "bg-white" : "bg-gray-900"}`}
          data-scroll-section
          data-scroll
          data-scroll-repeat="true"
        >
          <Gallery />
        </div>{" "}
        {/* Popular Groups section with staggered reveal */}
        <div
          className={`${theme === "light" ? "bg-white" : "bg-gray-900"} py-4`}
          data-scroll-section
          id="popular-groups-section"
        >
          <PopularGroups />
        </div>
        {/* Reviews section with fade-in animation */}
        <div
          className={`${theme === "light" ? "bg-white" : "bg-gray-900"} py-4`}
          data-scroll-section
          id="reviews-section"
        >
          <Reviews />
        </div>
        {/* FAQ section with sequential reveal */}
        <div
          className={`${theme === "light" ? "bg-white" : "bg-gray-900"} py-4`}
          data-scroll-section
          data-scroll
          data-scroll-repeat="true"
        >
          <Faq />
        </div>
        {/* Brands section with parallax effect */}{" "}
        <div
          className={`${
            theme === "light" ? "bg-white" : "bg-gray-900"
          } `}
          data-scroll-section
          data-scroll
          data-scroll-repeat="true"
        >
          <Brands />
        </div>
        {/* Footer section */}
        <div className={`${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
