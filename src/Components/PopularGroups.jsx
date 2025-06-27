import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../Provider/DataContext.js';
import { useNavigate } from 'react-router';

const PopularGroups = () => {
  const { groups, loading, error } = useContext(DataContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  // Use DataContext groups for popular groups
  const popularGroups = Array.isArray(groups) ? groups.slice(0, 16) : [];

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

    // Force scroll update to detect elements on component mount
    if (window.locomotive) {
      setTimeout(() => {
        window.locomotive.update();
      }, 300);
    }

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Update scroll when groups change
  useEffect(() => {
    if (window.locomotive && typeof window.locomotive.update === 'function' && groups.length > 0) {
      setTimeout(() => {
        if (window.locomotive && typeof window.locomotive.update === 'function') {
          window.locomotive.update();
        }
      }, 200);
    }
  }, [groups]);

 
  if (loading) return (
    <div className={`max-w-7xl mx-auto my-12 px-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <h2 className={`text-3xl font-bold mb-8 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Popular Groups</h2>
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className={`max-w-7xl mx-auto my-12 px-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <h2 className={`text-3xl font-bold mb-8 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Popular Groups</h2>
      <div className="text-center text-red-500">Error loading groups: {error}</div>
    </div>
  );

  if (!loading && !error && popularGroups.length === 0) {
    return (
      <div className={`max-w-7xl mx-auto my-12 px-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <h2 className={`text-3xl font-bold mb-8 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Popular Groups</h2>
        <div className="text-center text-gray-500 py-8">No groups found.</div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto my-12 px-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} transition-colors duration-300`}>
      <h2 
        className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'} reveal`}
        data-scroll
        data-scroll-class="is-inview"
        data-scroll-repeat="true"
        data-scroll-offset="30%"
      >
        Popular Groups
      </h2>
      
      {/* Group cards grid with staggered animations */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        data-scroll
      >
        {popularGroups.map((group, idx) => (
          <div key={group.groupName + idx}
            className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer reveal`}
            onClick={() => navigate(`/group/${encodeURIComponent(group.groupName)}`)}
            data-scroll
            data-scroll-class="is-inview"
            data-scroll-delay={`${0.05 * (idx % 4)}`}
            data-scroll-offset="20%"
            data-scroll-repeat="true"
          >
            {/* Group image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={group.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={group.groupName}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              {/* Category badge */}
              <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {group.hobbyCategory}
              </div>
            </div>
            
            {/* Group info */}
            <div className="p-4">
              <h3 className={`font-bold text-lg mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'} truncate`}>{group.groupName}</h3>
              <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} text-sm mb-2 line-clamp-2`}>{group.description}</p>
              
              {/* Group details */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {group.members}/{group.maxMembers} members
                  </span>
                </div>
                <span className={`text-xs ${theme === 'light' ? 'bg-gray-100 text-gray-500' : 'bg-gray-700 text-gray-400'} px-2 py-1 rounded-full`}>
                  {group.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View all groups button */}
      <div className="text-center mt-10" data-scroll>
        <button 
          onClick={() => navigate('/all-groups')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 reveal-scale"
          data-scroll
          data-scroll-class="is-inview"
          data-scroll-offset="10%"
        >
          View All Groups
        </button>
      </div>
    </div>
  );
};

export default PopularGroups;