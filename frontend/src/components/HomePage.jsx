import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <motion.h1 
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Resume Manager
      </motion.h1>
      <motion.div 
        className="flex gap-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={'/resume-upload'} className="px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold text-lg shadow-lg hover:bg-gray-200 transition-all">
          Upload Resume
        </Link>
        <Link to={'/resume-search'} className="px-6 py-3 rounded-lg bg-white text-purple-600 font-semibold text-lg shadow-lg hover:bg-gray-200 transition-all">
          Search Resume
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
