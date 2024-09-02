import React from 'react';
import quotes from '../constants/quotes'; 

const Navbar = () => {
  const username = localStorage.getItem('username') || 'Guest';
  
  // Function to get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  return (
    <nav className="bg-gray-800 p-4 flex flex-col md:flex-row justify-between items-center w-full">
      <div className="text-white text-2xl font-bold mb-2 md:mb-0 md:flex-1 text-center">
        Blogify
      </div>

      <div className="text-white text-lg md:flex-1 text-center">
        {getRandomQuote()}
      </div>

      <div className="text-white text-xl md:flex-1 text-center">
        @{username}
      </div>
    </nav>
  );
};

export default Navbar;
