import React, { useState } from "react";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("signIn");
  const [formData, setFormData] = useState({
    account: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 ">
      <div className="w-full max-w-4xl bg-white rounded-lg border-l-amber-800 shadow-sm overflow-hidden ">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Main Login Form */}
          <div className="w-full md:w-1/2 p-8 ">
            <h2 className="text-2xl font-bold text-center mb-6">
              Sign in to continue
            </h2>

            <div className="flex justify-center  space-x-4 mb-6 border-b border-gray-300 boder-1">
              <button
                className={`pb-1 px-1 cursor-pointer  ${
                  activeTab === "signIn"
                    ? "  border-b-2 border-orange-700 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("signIn")}
              >
                Sign In
              </button>
              <button
                className={`pb-1 px-1 cursor-pointer ${
                  activeTab === "sso"
                    ? "border-b-2 border-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("sso")}
              >
                Single Sign-On
              </button>
            </div>

            {activeTab === "signIn" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Account <span className="text-gray-400">[REQUIRED]</span>
                  </label>
                  <input
                    type="text"
                    name="account"
                    placeholder="username or email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.account}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Password <span className="text-gray-400">[REQUIRED]</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between items-center">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Lost your password?
                  </a>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            {activeTab === "sso" && (
              <div className="text-center py-8">
                <p>Single Sign-On content would go here</p>
              </div>
            )}
          </div>

          {/* Right Section - Social Login Options */}
          <div className="w-full md:w-1/2 bg-white p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs space-y-4">
              <p className="font-semibold text-gray-700 mb-6">Sign in with:</p>

              <button className="w-full flex  space-x-2 p-2 border border-gray-300 rounded-md hover:bg-white">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                <span className="text-sm font-semibold">
                  {" "}
                  Sign in with Google
                </span>
              </button>

              <button className="w-full flex  space-x-2 p-2 border border-gray-300 rounded-md hover:bg-white">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold">
                  {" "}
                  Sign in with GitHub
                </span>
              </button>

              <button className="w-full flex  space-x-2 p-2 border border-gray-300 rounded-md hover:bg-white">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M0 0v24h24V0H0zm22.089 21.988l-7.322-3.824-7.323 3.824V2.012l7.323 3.824 7.322-3.824v19.976z" />
                </svg>
                <span className="text-sm font-semibold">
                  {" "}
                  Sign in with Azure DevOps
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
