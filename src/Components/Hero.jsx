import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
 
const Hero = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  
  useEffect(() => {
    // Create a timeline for sequential animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate first line coming from left
    tl.fromTo(
      line1Ref.current, 
      { x: "-100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2 }
    );
    
    // Animate second line coming from left after first line
    tl.fromTo(
      line2Ref.current,
      { x: "-100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2 },
      "-=0.8" // Start slightly before the first animation completes
    );
    
    return () => {
       tl.kill();
    };
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-start min-h-[70vh] sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto mt-10 ">
      <div className="overflow-hidden px-5">
        <h1 className="text-4xl md:text-9xl font-bold text-white mb-4 overflow-hidden">
          <div ref={line1Ref} className="leading-tight text-5xl md:text-7xl lg:text-9xl">
            Find your people
          </div>
        </h1>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white overflow-hidden">
          <div ref={line2Ref} className="leading-tight text-5xl md:text-7xl lg:text-9xl">
            <span className='h-5 w-8     md:h-8 md:w-10   lg:h-12 lg:w-24 inline-block bg-amber-500'></span>Fuel your passion
          </div>
        </h2>
        
        <div className="mt-12 reveal" data-scroll data-scroll-class="is-inview">
          <button 
          onClick={() => window.location.href = '/all-groups'}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
            Join the Community
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default Hero;