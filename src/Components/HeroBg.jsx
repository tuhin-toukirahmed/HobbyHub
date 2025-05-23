import React from 'react';

const HeroBg = ({ children }) => {
  return (
    <div 
      className="relative w-full"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1729730626222-d8a56e855f51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default HeroBg;
