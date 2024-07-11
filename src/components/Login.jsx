import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giriş formu gönderme işlemleri burada yapılacak
  };

  return (
    <div className="h-screen @apply bg-[linear-gradient(rgba(255,255,255,0.1)_0%,rgb(0,0,0)_100%)] flex items-center justify-center text-white">
      <div className="bg-[#121212] p-8 mt-[-50px] rounded-lg shadow-lg w-full sm:w-[734px] flex justify-center">
        <div className="w-[324px]">
          <header className="flex flex-col items-center mb-8">
            <svg
              className="w-14 h-14 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>Spotify</title>
              <path
                d="M12 0C5.37285 0 0 5.37264 0 11.9998C0 18.6277 5.37285 24 12 24C18.6277 24 24 18.6277 24 11.9998C24 5.37264 18.6277 0 12 0ZM19.0985 10.6382C15.2302 8.34115 8.85004 8.13001 5.15734 9.25061C4.56443 9.4307 3.93745 9.09586 3.75774 8.50285C3.57803 7.90967 3.91237 7.283 4.50579 7.10274C8.74454 5.81575 15.7911 6.06437 20.244 8.70775C20.7776 9.02438 20.9524 9.71333 20.6363 10.2458C20.3199 10.7793 19.6303 10.9549 19.0985 10.6382ZM17.6847 14.3488C14.4602 12.3664 9.54258 11.7923 5.72724 12.9502C5.23257 13.0996 4.71006 12.8208 4.55976 12.327C4.41084 11.8322 4.68965 11.3109 5.1838 11.1605C9.54206 9.83755 14.9602 10.4784 18.6638 12.7544C19.1038 13.0254 19.2424 13.6014 18.9717 14.0407C18.7003 14.481 18.1247 14.6191 17.6847 14.3488ZM16.475 17.5571C13.657 15.8349 10.1104 15.446 5.93306 16.4002C5.53058 16.4923 5.12966 16.2401 5.03782 15.8377C4.94546 15.4352 5.19677 15.0339 5.60011 14.9421C10.1715 13.8972 14.0923 14.3469 17.2554 16.2796C17.6079 16.4949 17.7191 16.9557 17.5034 17.3084C17.2879 17.6619 16.8275 17.7727 16.475 17.5571Z"
                fill="white"
              />
            </svg>
            <h1 className="text-3xl font-bold">Spotify&apos;da oturum aç</h1>
          </header>
          <div className="flex flex-col space-y-4 mb-6 justify-center items-center">
            <button className="flex items-center justify-center w-[324px] py-2 bg-transparent border border-gray-400 rounded-full hover:border-white">
              <span className="mr-2"></span>
              Google ile devam et
              <GoogleLogin
                clientId="563675178293-ilfitt408k1gvic3lvqcsi6j3mht26og.apps.googleusercontent.com"
                buttonText="Google ile Giriş Yap"
                cookiePolicy={"single_host_origin"}
              />
            </button>
            <button className="flex items-center justify-center w-[324px] py-2 bg-transparent border border-gray-400 rounded-full hover:border-white">
              <span className="mr-2"></span>
              Facebook ile devam et
            </button>
            <button className="flex items-center justify-center w-[324px] py-2 bg-transparent border border-gray-400 rounded-full hover:border-white">
              <span className="mr-2"></span>
              Apple ile devam et
            </button>
          </div>
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-[#a7a7a7]"></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="emailOrUsername" className="block ">
                E-posta adresi veya kullanıcı adı
              </label>
              <input
                type="text"
                id="emailOrUsername"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="w-full py-3 px-4 mt-2 text-black bg-transparent rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="E-posta adresi veya kullanıcı adı"
              />
            </div>
            <div>
              <label htmlFor="password" className="block">
                Parola
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 mt-2 text-black bg-transparent rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Parola"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="rememberMe"
                className={`relative inline-block w-10 h-5 ${
                  isFocused ? "ring-2 ring-white rounded-full" : ""
                }`}
                onClick={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                tabIndex={0}
              >
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span
                  className={`absolute inset-0 cursor-pointer bg-gray-400 rounded-full transition-colors duration-300 ${
                    rememberMe ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                <span
                  className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform duration-300  ${
                    rememberMe ? "transform translate-x-5" : ""
                  }`}
                ></span>
              </label>
              <label htmlFor="rememberMe" className="text-gray-500 text-xs">
                Beni hatırla
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#1ed760] text-black font-bold rounded-full hover:bg-green-500"
            >
              Oturum Aç
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Parolanı mı unuttun?
            </a>
          </div>
          <div className="mt-4 text-center text-gray-500">
            <p>
              Hesabın yok mu?{" "}
              <Link to="/SignUp" className="text-white hover:underline">
                Spotify için kaydol
              </Link>
            </p>
          </div>
        </div>
        <footer className="fixed bottom-0 p-4 text-center text-xs px-4  w-full text-[#a7a7a7] bg-[#121212] ">
          <p>
            This site is protected by reCAPTCHA and the Google
            <a href="#" className="underline">
              {" "}
              Privacy Policy
            </a>{" "}
            and
            <a href="#" className="underline">
              {" "}
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
