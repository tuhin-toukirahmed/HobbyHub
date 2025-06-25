import React, { useState, useEffect } from 'react';
import RollingGallery from './RollingGallery';
import { useNavigate } from 'react-router';

const Gallery = () => {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
     const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme);

     const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        }
      });
    });

     observer.observe(document.documentElement, { attributes: true });

     return () => observer.disconnect();
  }, []);
  return (
    <div className={`w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} py-16`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 
          className={`text-4xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} text-center mb-12 reveal`}
          data-scroll
          data-scroll-class="is-inview"
          data-scroll-repeat="true"
        >
          Explore Our Hobby Community
        </h2>
        
        <div 
          className="mb-8 reveal"
          data-scroll
          data-scroll-class="is-inview"
          data-scroll-delay="0.1"
        >
          <RollingGallery autoplay={true} pauseOnHover={true} />
        </div>
        
        <div 
          className="text-center"
          data-scroll
          data-scroll-speed="0.2"
        >
          <p 
            className={`${theme === 'light' ? 'text-gray-700' : 'text-white'} text-lg mb-8 reveal reveal-delay-300`}
            data-scroll
            data-scroll-class="is-inview"
          >
            Join enthusiasts from all walks of life sharing their passion and creativity
          </p>
           
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 cursor-pointer"
            onClick={() => navigate('/all-groups')}
          >
            Join a Group Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;