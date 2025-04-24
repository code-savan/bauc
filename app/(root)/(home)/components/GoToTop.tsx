'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    // Show button when user scrolls down 300px from the top
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 w-[35px] h-[35px] rounded-md bg-green-700 flex items-center justify-center cursor-pointer shadow-lg hover:bg-green-800 transition-all duration-300"
          aria-label="Go to top"
        >
          <ChevronUp color='white' size={18} />
        </button>
      )}
    </>
  );
};

export default GoToTop;
