import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/SignUp");
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <nav>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt="Go Back"
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt="Go Forward"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex space-x-4">
            <button
              className="text-gray-400 hover:text-white transition-transform transform hover:scale-105"
              onClick={handleSignUpClick}
            >
              Kaydol
            </button>
            <button
              className="px-7 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105"
              onClick={handleLoginClick}
            >
              Oturum aç
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Podcast</p>
      </div>
    </nav>
  );
};

export default Navbar;
