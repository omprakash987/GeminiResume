import React, { useState } from 'react';
import { useResumeStore } from '../store/resume.store';
import { motion } from 'framer-motion';

const ResumeUpload = () => {
    const [file, setFile] = useState(null);

    const { isSubmittingResume, uploadResume } = useResumeStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        await uploadResume(file);
        setFile(null);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <motion.form 
                className="bg-white p-8 rounded-xl shadow-lg w-96 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Upload Resume</h2>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="application/pdf"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <motion.button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    disabled={isSubmittingResume}
                >
                    {isSubmittingResume ? 'Submitting...' : 'Submit'}
                </motion.button>
            </motion.form>
        </div>
    );
};

export default ResumeUpload;
