// src/components/Login.js
import React, { useState } from "react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    // Add your login logic here
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Section - Login Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="h-full w-full md:w-1/2 bg-white/80 backdrop-blur-lg flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md space-y-8">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account
            </p>
          </motion.div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <motion.div variants={itemVariants} className="space-y-5">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400 transition-all duration-200"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400 transition-all duration-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Forgot password?
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
              >
                <motion.span
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Sign In
                </motion.span>
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Right Section - Information */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="h-full w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md space-y-8 text-white">
          <motion.div variants={itemVariants}>
            <h3 className="text-4xl font-bold">Why Join Us?</h3>
            <p className="mt-2 text-sm opacity-90">
              Discover the benefits of being part of our community
            </p>
          </motion.div>

          <motion.ul variants={itemVariants} className="space-y-6">
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-white rounded-full"></span>
              <span>Secure and fast authentication</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-white rounded-full"></span>
              <span>Access exclusive features</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-white rounded-full"></span>
              <span>Join a growing community</span>
            </li>
          </motion.ul>

          <motion.div variants={itemVariants}>
            <p className="text-sm opacity-90">Don't have an account?</p>
            <a
              href="#"
              className="mt-4 inline-block px-8 py-3 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-all duration-200 transform hover:scale-105"
            >
              Sign Up Now
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
