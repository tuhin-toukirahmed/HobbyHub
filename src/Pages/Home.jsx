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

const Home = () => {  const scrollRef = useRef(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get the current theme when component mounts
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme);

    // Create a MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.documentElement, { attributes: true });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let scroll = null;
    let handleResize = () => {};
    let handleScroll = () => {};    // Initialize Locomotive Scroll with optimized settings for smooth scrolling
    if (scrollRef.current) {
      scroll = new LocomotiveScroll({
        el: scrollRef.current,        smooth: true,
        smoothMobile: true,
        multiplier: 0.8, // Reduced multiplier for smoother scrolling
        lerp: 0.07, // Light damping effect for smoother transitions
        reloadOnContextChange: true, // Reload on context/theme changes
        inertia: 0.6, // Added inertia for smoother deceleration
        getDirection: true, // Enable directional info for animations
        resetNativeScroll: false, // Helps with cross-browser support
        scrollFromAnywhere: true, // Enhances mobile scroll behavior
        scrollbarClass: 'locomotive-scrollbar',
        touchMultiplier: 2.5, // Improve touch device responsiveness
        useKeyboard: true, // Enable keyboard navigation
        smartphone: {
          smooth: true,
          multiplier: 0.9,
        },
        tablet: {
          smooth: true,
          multiplier: 0.8,
        },
      });
      
      // Store scroll instance globally for components to access
      window.locomotive = scroll;// Update scrollbar position on window resize for smooth responsive behavior
      handleResize = () => {
        setTimeout(() => {
          scroll.update();
        }, 100);
      };
        // Initial update to ensure all scroll animations are initialized
      setTimeout(() => {
        scroll.update();
      }, 500);
        // Force a second update after content has settled
      setTimeout(() => {
        scroll.update();
      }, 1500);
        // Add a final update after all content and images are likely loaded
      setTimeout(() => {
        scroll.update();
        
        // Force update for popular groups section specifically
        const popularGroupsSection = document.getElementById('popular-groups-section');
        if (popularGroupsSection) {
          scroll.scrollTo(popularGroupsSection, {
            offset: -50,
            duration: 0,
            disableLerp: true,
            callback: () => scroll.update()
          });
          scroll.update();
        }
        
        // Force update for reviews section
        const reviewsSection = document.getElementById('reviews-section');
        if (reviewsSection) {
          setTimeout(() => {
            scroll.update();
          }, 200);
        }
      }, 3000);
      
      window.addEventListener("resize", handleResize);
        // Handle scroll events to ensure sections are properly updated
      handleScroll = () => {
        if (scroll) {
          scroll.update();
        }
      };
      
      window.addEventListener("scroll", handleScroll);
    }

    // Clean up the scroll instance when component unmounts
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
      className={`overflow-hidden perspective-1000 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
      id="scroll-container"
      data-scroll-container
      ref={scrollRef}
    >
      <BgImage />
      <div className="content relative z-20">        {/* Hero section */}
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
          className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`} 
          data-scroll-section
          data-scroll
          data-scroll-repeat="true"
        >
          <Gallery />
        </div>        {/* Popular Groups section with staggered reveal */}
        <div 
          className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} py-4`} 
          data-scroll-section
          id="popular-groups-section"
        >
          <PopularGroups />
        </div>
            {/* Reviews section with fade-in animation */}
        <div 
          className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} py-4`} 
          data-scroll-section
          id="reviews-section"
        >
          <Reviews />
        </div>

        {/* FAQ section with sequential reveal */}
        <div 
          className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} py-4`} 
          data-scroll-section
          data-scroll
          data-scroll-repeat="true"
        >
          <Faq />
        </div>
          
        {/* Brands section with parallax effect */}
        <div 
          className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} py-4`} 
          data-scroll-section
          data-scroll
          data-scroll-repeat="true"
        >
          <Brands/>
        </div>
        
        
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`} data-scroll-section>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
