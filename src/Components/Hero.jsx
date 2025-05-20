import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

const Hero = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });
    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container style={{ minHeight: "100vh" }}>
      <div data-scroll-section>hero</div>
    </div>
  );
};

export default Hero;
