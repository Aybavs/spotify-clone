import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import SignUp from "./components/SignUp";
import { PLayerContext } from "./context/PlayerContext";
import Login from "./components/Login";
import GoogleAuthProviderConfig from "./googleAuth";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "./context/AuthContext.jsx"; // Import useAuth

const App = () => {
  const { audioRef, track } = useContext(PLayerContext);
  const location = useLocation();
  const { token, signIn } = useAuth(); // Use token and signIn from useAuth

  const noNavbarAndPlayer = ["/SignUp", "/Login"];

  const handleGoogleSuccess = (response) => {
    console.log("Google Sign-In successful:", response);
    signIn(response.code); // Assuming 'code' is the token, adjust if necessary
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In failed:", error);
  };

  return (
    <GoogleAuthProviderConfig>
      <div className="h-screen bg-black">
        {!noNavbarAndPlayer.includes(location.pathname) && (
          <>
            <div className="h-[90%] flex">
              <Sidebar />
              <Display />
            </div>
            <Player />
          </>
        )}
        {location.pathname === "/SignUp" && <SignUp />}
        {location.pathname === "/Login" && (
          <div>
            <Login />
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>
        )}
        <audio ref={audioRef} src={track.file} preload="auto"></audio>
      </div>
    </GoogleAuthProviderConfig>
  );
};

export default App;
