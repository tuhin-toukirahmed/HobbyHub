import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [animationClass, setAnimationClass] = useState('');
  
  useEffect(() => {
    // Add animation class after component mounts for entrance effect
    setAnimationClass('animate-fadeIn');
    
    // Clean up any event listeners or timers if needed
    return () => {};
  }, []);
  
  const goHome = (e) => {
    e.preventDefault();
    setAnimationClass('animate-fadeOut');
    
    // Wait for animation to finish before navigating
    setTimeout(() => {
      navigate('/');
    }, 300);
  };  
  return (
    <div>
      <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 transition-opacity duration-300 ${animationClass}`}>
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="mb-8">
            <img 
              src="/broken-hobby.svg" 
              alt="Broken hobby icon" 
              className="mx-auto h-24 w-auto mb-4"
              onError={(e) => e.target.style.display = 'none'}
            />
            <h2 className="mt-6 text-6xl font-extrabold text-gray-900 dark:text-gray-100">404</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">Page not found</p>
            <p className="mt-2 text-md text-gray-600 dark:text-gray-400">Sorry, we couldn't find the hobby group or page you're looking for.</p>
          </div>          <div className="mt-8">
            <a href="/" onClick={goHome}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md hover:shadow-lg">
              <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to HobbyHub
            </a>
          </div>
        </div>        <div className="mt-16 w-full max-w-2xl">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900 text-sm text-blue-600 dark:text-blue-200">
                Explore more hobby groups on our home page
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
