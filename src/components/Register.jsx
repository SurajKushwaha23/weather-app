// src/components/Register.js
import React, { useState } from "react";
import { motion } from "framer-motion";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration attempted with:", { username, email, password });
    // Add your registration logic here
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

  const labelVariants = {
    unfocused: { y: 0, scale: 1, color: "#6b7280" },
    focused: { y: -20, scale: 0.85, color: "#4f46e5" },
  };

  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Section - Registration Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 bg-white/80 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-[50vh] md:min-h-screen"
      >
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
              Join our community today
            </p>
          </motion.div>

          <form
            className="mt-6 sm:mt-8 space-y-6 sm:space-y-8"
            onSubmit={handleSubmit}
          >
            <motion.div
              variants={itemVariants}
              className="space-y-6 sm:space-y-8"
            >
              {/* Username Field */}
              <div className="relative">
                <motion.label
                  htmlFor="username"
                  variants={labelVariants}
                  animate={
                    isUsernameFocused || username ? "focused" : "unfocused"
                  }
                  className="absolute left-3 sm:left-4 top-2 sm:top-3 font-medium text-sm sm:text-base transition-all duration-300 pointer-events-none"
                >
                  Username
                </motion.label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-transparent border-2 border-gray-200 rounded-xl focus:border-indigo-600 text-gray-900 placeholder-transparent transition-all duration-300 hover:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none text-sm sm:text-base"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <motion.label
                  htmlFor="email-address"
                  variants={labelVariants}
                  animate={isEmailFocused || email ? "focused" : "unfocused"}
                  className="absolute left-3 sm:left-4 top-2 sm:top-3 font-medium text-sm sm:text-base transition-all duration-300 pointer-events-none"
                >
                  Email Address
                </motion.label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-transparent border-2 border-gray-200 rounded-xl focus:border-indigo-600 text-gray-900 placeholder-transparent transition-all duration-300 hover:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none text-sm sm:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <motion.label
                  htmlFor="password"
                  variants={labelVariants}
                  animate={
                    isPasswordFocused || password ? "focused" : "unfocused"
                  }
                  className="absolute left-3 sm:left-4 top-2 sm:top-3 font-medium text-sm sm:text-base transition-all duration-300 pointer-events-none"
                >
                  Password
                </motion.label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-transparent border-2 border-gray-200 rounded-xl focus:border-indigo-600 text-gray-900 placeholder-transparent transition-all duration-300 hover:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none text-sm sm:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition-all duration-200"
                />
                <span className="text-xs sm:text-sm text-gray-600">
                  Accept terms
                </span>
              </label>
              <a
                href="#"
                className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Already have an account?
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full py-3 px-4 sm:py-4 sm:px-6 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
              >
                <motion.span
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Register
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
        className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-[50vh] md:min-h-screen"
      >
        <div className="w-full max-w-md space-y-6 sm:space-y-8 text-white">
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Get Started
            </h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm opacity-90">
              Create your account and unlock amazing features
            </p>
          </motion.div>

          <motion.ul variants={itemVariants} className="space-y-4 sm:space-y-6">
            <li className="flex items-center gap-2 sm:gap-3">
              <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></span>
              <span className="text-sm sm:text-base">
                Personalized experience
              </span>
            </li>
            <li className="flex items-center gap-2 sm:gap-3">
              <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></span>
              <span className="text-sm sm:text-base">
                Premium content access
              </span>
            </li>
            <li className="flex items-center gap-2 sm:gap-3">
              <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></span>
              <span className="text-sm sm:text-base">
                Exclusive community benefits
              </span>
            </li>
          </motion.ul>

          <motion.div variants={itemVariants}>
            <p className="text-xs sm:text-sm opacity-90">
              Have an account already?
            </p>
            <a
              href="#"
              className="mt-3 sm:mt-4 inline-block px-6 py-2 sm:px-8 sm:py-3 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              Sign In
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
