import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PLayerContext } from "../context/PlayerContext";

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

const Player = () => {
  const { track, seekBar, seekBg, playStatus, play, pause, time } =
    useContext(PLayerContext);

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt={track.name} />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt="Shuffle"
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="Previous"
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="Pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="Play"
            />
          )}
          <img
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="Next"
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.loop_icon}
            alt="Loop"
          />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {formatTime(time.currentTime.minutes)}:
            {formatTime(time.currentTime.seconds)}
          </p>
          <div
            ref={seekBg}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {formatTime(time.totalTime.minutes)}:
            {formatTime(time.totalTime.seconds)}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img
          className="w-4 cursor-pointer"
          src={assets.plays_icon}
          alt="Playlists"
        />
        <img
          className="w-4 cursor-pointer"
          src={assets.mic_icon}
          alt="Microphone"
        />
        <img
          className="w-4 cursor-pointer"
          src={assets.queue_icon}
          alt="Queue"
        />
        <img
          className="w-4 cursor-pointer"
          src={assets.speaker_icon}
          alt="Speaker"
        />
        <img
          className="w-4 cursor-pointer"
          src={assets.volume_icon}
          alt="Volume"
        />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img
          className="w-4 cursor-pointer"
          src={assets.mini_player_icon}
          alt="Mini Player"
        />
        <img className="w-4 cursor-pointer" src={assets.zoom_icon} alt="Zoom" />
      </div>
    </div>
  );
};

export default Player;
