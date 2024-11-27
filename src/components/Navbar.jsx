import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowDialog(true); // Show the dialog
    setTimeout(() => {
      dispatch(logout()); // Clear authentication state
      navigate("/signin"); // Navigate to the SignIn page
      setTimeout(() => {
        window.location.reload(); // Refresh the page after a short delay
      }, 10);
    }, 2000); // Simulate a 2-second delay for the dialog
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-[#011452] to-[#0056b3] p-4 flex justify-between items-center shadow-lg rounded-lg">
        <div className="flex items-center">
          <img
            src={`${process.env.PUBLIC_URL}/static/logo.png`}
            alt="Universal KYC Logo"
            className="h-12 w-12 mr-3"
          />
          <h1 className="text-white text-3xl font-bold tracking-wide">
            Universal KYC
          </h1>
        </div>
        <div className="flex space-x-6">
          <Link
            to="/dashboard"
            className="text-white text-lg hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/dashboard/kyc-list"
            className="text-white text-lg hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            KYCs
          </Link>
          <button
            onClick={handleLogout}
            className="text-white text-lg hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Logout Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Logging Out...
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we log you out.
            </p>
            <div className="mt-4">
              <svg
                className="animate-spin h-8 w-8 text-blue-600 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
