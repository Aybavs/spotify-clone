import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError(
        "Bu e-posta geçersiz. example@email.com şeklinde yazmayı unutma"
      );
    } else {
      setError("");
      // formu gönder
    }
  };

  return (
    <div className="h-screen bg-[#121212] flex flex-col items-center justify-between text-white pb-36">
      <header className="flex pt-8 min-h-8 overflow-hidden items-center">
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
      </header>
      <section className="flex flex-col items-center justify-center w-full text-center  ">
        <div className="w-9/12 sm:w-[324px] text-white justify-center align-center">
          <h1 className="font-bold text-5xl mb-10 block">
            Dinlemeye başlamak için kaydol
          </h1>
          <form onSubmit={handleSubmit} className="block mt-0 break-words">
            <div>
              <div>
                <label htmlFor="e-mail" className="block text-left mb-2">
                  E-posta adresi
                </label>
              </div>
              <div>
                <input
                  type="email"
                  id="e-mail"
                  placeholder="ad@alan.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 mt-2 mb-4 text-white bg-transparent rounded border border-white"
                />
              </div>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="font-bold w-full bg-[#1ed760] py-2 rounded-full mt-4 text-black"
            >
              İleri
            </button>
          </form>
          <div className="mt-8 block break-words">
            <div className="w-full relative flex justify-center h-px bg-[#878787]">
              <span className=" px-3 my-[-12px] relative bg-[#121212]">
                veya
              </span>
            </div>
            <div className="pt-5 mt-4 space-y-4">
              <a
                className="block w-full rounded-full font-bold text-base bg-transparent text-center py-2 border border-white hover:bg-white hover:text-black transition"
                href="#"
              >
                Google ile kaydol
              </a>
              <a
                className="block w-full rounded-full font-bold text-base bg-transparent text-center py-2 border border-white hover:bg-white hover:text-black transition"
                href="#"
              >
                Facebook ile kaydol
              </a>
              <a
                className="block w-full rounded-full font-bold text-base bg-transparent text-center py-2 border border-white hover:bg-white hover:text-black transition"
                href="#"
              >
                Apple ile kaydol
              </a>
            </div>
            <div className="w-full flex justify-center mt-6 h-px bg-[#878787]"></div>
            <div className="pt-6">
              <Link to="/login" className="text-[#a7a7a7]">
                Hesabın var mı?{" "}
                <span className="underline text-white">Buradan oturum aç.</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
