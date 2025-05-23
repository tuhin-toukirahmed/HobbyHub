import React from 'react';

const BgImage = ({ children, className, overlayColor = 'bg-black/50' }) => {
  return (    <div 
      className={`fixed top-0 z-0 left-0 bg-cover bg-center bg-no-repeat w-full ${className || ''} min-h-screen`}      data-scroll
      data-scroll-sticky
      data-scroll-target="#scroll-container"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1729730626222-d8a56e855f51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className={`absolute inset-0 ${overlayColor}`}></div>
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default BgImage;