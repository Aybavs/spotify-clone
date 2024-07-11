// src/googleAuth.js
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

// eslint-disable-next-line react/prop-types
const GoogleAuthProviderConfig = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="563675178293-ilfitt408k1gvic3lvqcsi6j3mht26og.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProviderConfig;
