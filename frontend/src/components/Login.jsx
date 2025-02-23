import React, { useState } from 'react';
import { authStore } from '../store/auth.store';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const { login, isLogin } = authStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isLogin) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">...loading</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.form 
        className="bg-white p-8 rounded-xl shadow-lg w-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <motion.button 
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Login
        </motion.button>
        <Link to={"/signup"}>
        don't have account
      <p className=' text-blue-500'>signup</p>
      </Link>
      </motion.form>
     
    </div>
  );
};

export default Login;
