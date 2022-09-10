import styled from "styled-components";
import {
  PauseIcon,
  PlayIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
} from "@radix-ui/react-icons";

import React, { useEffect, useRef, useState } from "react";

import { Text } from "@/components/Typography";
import { flexRow } from "@/styles/utils/flex";

const formatAsMSS = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);

  const progressRate = audioRef.current
    ? currentTime / audioRef.current.duration
    : 0;

  useEffect(() => {
    if (audioRef.current === null) return;

    const audioElement = audioRef.current;
    const handleTimeUpdate = (event: Event) => {
      const { currentTime } = event.target as HTMLAudioElement;
      setCurrentTime(currentTime);
    };
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (progressRef.current === null) return;

    progressRef.current.addEventListener("click", (event) => {
      if (progressRef.current === null || audioRef.current === null) return;

      const updatedProgressRate =
        event.offsetX / progressRef.current.offsetWidth;
      audioRef.current.currentTime =
        audioRef.current.duration * updatedProgressRate;
    });
  }, []);

  useEffect(() => {
    if (audioRef.current === null) return;

    const method = isPlaying ? "play" : "pause";
    audioRef.current[method]();
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current === null) return;

    const volume = isMuted ? 0 : 1;
    audioRef.current.volume = volume;
  }, [isMuted]);

  return (
    <Wrapper>
      <figcaption>Gatinha</figcaption>
      <Audio ref={audioRef} controls src="/ES_Gatinha - Cornelio.mp3">
        오디오 기능이 제공되지 않는 브라우저입니다.
      </Audio>

      <button
        type="button"
        onClick={() => setIsPlaying((prevIsPlaying) => !prevIsPlaying)}
        aria-label={isPlaying ? "중지" : "재생"}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        aria-label={isMuted ? "음소거 해제" : "음소거"}
        onClick={() => setIsMuted((prevIsMuted) => !prevIsMuted)}
      >
        {isMuted ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
      </button>

      <PlayerBar>
        <Text as="span" fontSize={12}>
          {formatAsMSS(currentTime)}
        </Text>
        <progress ref={progressRef} value={progressRate} />
        <Text as="span" fontSize={12} color="mauve11">
          {formatAsMSS(audioRef.current?.duration || 0)}
        </Text>
      </PlayerBar>
    </Wrapper>
  );
}

const Wrapper = styled.figure`
  ${flexRow("normal", "center")};
  margin: 0;
`;

const Audio = styled.audio`
  display: none;
`;

const PlayerBar = styled.div`
  ${flexRow("normal", "center")};
  gap: ${({ theme }) => theme.spacers[8]};
  width: 100%;

  span {
    min-width: 28px;
  }

  progress {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;

    width: 100%;
    height: 4px;

    &::-webkit-progress-bar {
      background-color: ${({ theme }) => theme.colors.mauve5};
    }
    &::-webkit-progress-value {
      background-color: ${({ theme }) => theme.colors.mauve12};
    }
  }
`;

export default AudioPlayer;