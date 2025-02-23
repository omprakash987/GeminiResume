import React, { useState } from 'react';
import { useResumeStore } from '../store/resume.store';
import { motion } from 'framer-motion';

const SearchResume = () => {
  const [name, setName] = useState("");
  const [resume, setResume] = useState(null);
  const { isSerachingResume, SearchResume } = useResumeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await SearchResume(name);
    console.log("result : ", result);
    setResume(result);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <motion.form 
        className="bg-white p-8 rounded-xl shadow-lg w-96 flex flex-col items-center mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Search Resume</h2>
        <input
          type="search"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter name to search"
        />
        <motion.button 
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all"
          whileHover={{ scale: 1.05 }}
          disabled={isSerachingResume}
        >
          {isSerachingResume ? 'Searching...' : 'Search'}
        </motion.button>
      </motion.form>

      {resume && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl space-y-4">
          <div className="text-center border-b pb-4">
            <h3 className="text-3xl font-bold text-gray-700">{resume.name}</h3>
            <p className="text-gray-500">{resume.email}</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Summary</h4>
            <p className="text-gray-600 mt-2">{resume.summary}</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Education</h4>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">{resume.education.degree}</span> - {resume.education.institution} ({resume.education.year})
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Experience</h4>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">{resume.experience.job_title}</span> at {resume.experience.company}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Skills</h4>
            <div className="flex flex-wrap gap-2 mt-3">
              {resume.skills.map((skill, index) => (
                <span key={index} className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResume;
