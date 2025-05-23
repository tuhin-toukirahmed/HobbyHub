import React, { useState, useEffect } from "react";

// Reusable ReviewCard component
const ReviewCard = ({ review }) => {
  const { name, profession, image, content } = review;

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
  return (    <li 
      className="text-sm leading-6 reveal"
      data-scroll
      data-scroll-class="is-inview"
      data-scroll-offset="15%"
      data-scroll-repeat="true"
    >
      <div className="relative group">
        <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div><div className="cursor-pointer">
          <div className={`relative p-6 space-y-6 leading-none rounded-lg ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'} ring-1 ${theme === 'light' ? 'ring-gray-200' : 'ring-gray-700'} shadow-md`}>
            <div className="flex items-center space-x-4">
              <img
                src={image}
                className="w-12 h-12 bg-center bg-cover border rounded-full"
                alt={name}
              />
              <div>
                <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{name}</h3>
                <p className={`text-md ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{profession}</p>
              </div>
            </div>
            <p className={`leading-normal text-md ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{content}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
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
  // Update locomotive scroll when reviews are loaded
  useEffect(() => {
    if (!loading && reviews.length > 0 && window.locomotive) {
      setTimeout(() => {
        window.locomotive.update();
      }, 200);
    }
  }, [loading, reviews]);

  useEffect(() => {
    // This would normally fetch from an API, but for demo purposes we're using static data
    const demoReviews = [
      {
        id: 1,
        name: "Alex Johnson",
        profession: "Photography Enthusiast",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        content:
          "HobbyHub has completely transformed how I connect with other photography enthusiasts. The community is supportive and I've learned so many new techniques!",
      },
      {
        id: 2,
        name: "Samantha Lee",
        profession: "Chess Player",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        content:
          "I've been looking for a chess group for years. Thanks to HobbyHub, I found an amazing community of players who meet weekly. Highly recommended!",
      },
      {
        id: 3,
        name: "Michael Chen",
        profession: "Cooking Enthusiast",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        content:
          "The cooking groups on HobbyHub are fantastic! I've expanded my culinary skills and made great friends who share my passion for international cuisines.",
      },
      {
        id: 4,
        name: "Emily Rodriguez",
        profession: "Hiking Adventurer",
        image: "https://randomuser.me/api/portraits/women/28.jpg",
        content:
          "HobbyHub connected me with local hiking enthusiasts. We've explored amazing trails together that I would never have discovered on my own.",
      },
      {
        id: 5,
        name: "David Thompson",
        profession: "Book Club Member",
        image: "https://randomuser.me/api/portraits/men/53.jpg",
        content:
          "The book discussion groups on HobbyHub have reignited my love for reading. It's so enriching to discuss great books with other passionate readers.",
      },
      {
        id: 6,
        name: "Sarah Wilson",
        profession: "Yoga Practitioner",
        image: "https://randomuser.me/api/portraits/women/57.jpg",
        content:
          "I found an amazing yoga community through HobbyHub. We practice together online and sometimes meet in person. It's been a wonderful experience!",
      },
      {
        id: 7,
        name: "Robert Garcia",
        profession: "Board Game Enthusiast",
        image: "https://randomuser.me/api/portraits/men/42.jpg",
        content:
          "Board game nights organized through HobbyHub have become the highlight of my month. Great people, fun games, and unforgettable experiences!",
      },
      {
        id: 8,
        name: "Jessica Kim",
        profession: "Gardening Hobbyist",
        image: "https://randomuser.me/api/portraits/women/63.jpg",
        content:
          "The gardening tips I've gotten from my HobbyHub group have transformed my garden. We exchange plants, seeds, and knowledge regularly.",
      },
      {
        id: 9,
        name: "James Wilson",
        profession: "Music Lover",
        image: "https://randomuser.me/api/portraits/men/67.jpg",
        content:
          "Through HobbyHub, I found people who share my taste in obscure music genres. We've even started jamming together and might form a band soon!",
      },
    ];

    // Simulate API fetch
    setTimeout(() => {
      setReviews(demoReviews);
      setLoading(false);
    }, 300);
  }, []);  // Force visibility of reviews as a backup
  useEffect(() => {
    if (!loading && reviews.length > 0) {
      const timer = setTimeout(() => {
        const reviewElements = document.querySelectorAll('#reviews-section .reveal');
        reviewElements.forEach(el => {
          el.classList.add('is-inview');
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.visibility = 'visible';
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [loading, reviews]);

  return (
    <div>
      <section id="testimonies" className={`py-5 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto"><div 
            className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100"
            data-scroll
          >
            <div className="mb-12 space-y-5 md:mb-16 md:text-center">
              <h1 
                className={`mb-5 text-3xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} md:text-center md:text-5xl reveal`}
                data-scroll
                data-scroll-class="is-inview"
                data-scroll-offset="30%"
              >
                Hear from our members
              </h1>
              <p 
                className={`text-xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} md:text-center md:text-2xl reveal reveal-delay-200`}
                data-scroll
                data-scroll-class="is-inview"
              >
                Discover how HobbyHub is connecting passionate people worldwide.
              </p>
            </div>
          </div>{loading ? (
            <div className="flex justify-center items-center h-64">
              <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === 'light' ? 'border-blue-500' : 'border-purple-500'}`}></div>
            </div>
          ) : (            <div 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
              data-scroll
            >
              <ul 
                className="space-y-8"
                data-scroll
                data-scroll-offset="10%"
              >                {reviews.slice(0, 3).map((review, idx) => (
                  <div key={review.id} data-scroll data-scroll-delay={`${0.05 * idx}`} data-scroll-offset="10%">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </ul>

              <ul 
                className="hidden space-y-8 sm:block"
                data-scroll
                data-scroll-offset="10%"
              >                {reviews.slice(3, 6).map((review, idx) => (
                  <div key={review.id} data-scroll data-scroll-delay={`${0.05 * idx}`} data-scroll-offset="10%">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </ul>

              <ul 
                className="hidden space-y-8 lg:block"
                data-scroll
                data-scroll-offset="10%"
              >
                {reviews.slice(6, 9).map((review, idx) => (
                  <div key={review.id} data-scroll data-scroll-delay={`${0.05 * idx}`} data-scroll-offset="10%">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
