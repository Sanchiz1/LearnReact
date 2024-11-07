import { type MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

const defaultOptions: Required<UseAudioOptions> = {
  volume: 1,
  loop: false,
  muted: false,
  playbackRate: 1
}

const defaultState: AudioState = {
  duration: 0,
  currentTime: 0,
  isPlaying: false,
  ...defaultOptions
}

const checkIfRefElementExists = <TElement>(ref: MutableRefObject<TElement>, callback: (element: TElement) => unknown) => () => {
  const element = ref.current

  if (!element) {
    return undefined
  }

  return callback(element)
}

export const useAudio = (src: string, options?: UseAudioOptions) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(src))
  const [loop, setLoop] = useState<boolean>(defaultState.loop)
  const [muted, setMuted] = useState<boolean>(defaultState.muted)
  const [volume, setVolume] = useState<number>(defaultState.volume)
  const [duration, setDuration] = useState<number>(defaultState.duration)
  const [isPlaying, setIsPlaying] = useState<boolean>(defaultState.isPlaying)
  const [currentTime, setCurrentTime] = useState<number>(defaultState.currentTime)
  const [playbackRate, setPlaybackRate] = useState<number>(defaultState.playbackRate)

  const play = useCallback(
    checkIfRefElementExists(audioRef, async (element) => {
      await element
        .play()
        .then(() => {
          setIsPlaying(true);
        })
    }),
    []
  )

  const pause = useCallback(
    checkIfRefElementExists(audioRef, (element) => {
      element.pause();
      setIsPlaying(false);
    }),
    []
  )

  const mute = useCallback(
    checkIfRefElementExists(audioRef, (element) => {
      element.muted = true;
      setMuted(true);
    }),
    []
  )

  const unmute = useCallback(
    checkIfRefElementExists(audioRef, (element) => {
      element.muted = false;
      setMuted(false);
    }),
    []
  )

  const seek = useCallback(
    (time: number) => checkIfRefElementExists(audioRef, (element) => {
      const newTime = time >= 0 ? Math.min(time, element.duration) : Math.max(time, 0);
      element.currentTime = newTime;
      setCurrentTime(newTime);
    })(),
    []
  )

  const changeVolume = useCallback(
    (volume: number) => checkIfRefElementExists(audioRef, (element) => {
      const newVolume = volume >= 0 ? Math.min(volume, 1) : Math.max(volume, 0);
      element.volume = newVolume;
      setVolume(newVolume);
    })(),
    []
  )

  const onLoadedData = checkIfRefElementExists(audioRef, (element) => {
    setDuration(element.duration);
    setCurrentTime(element.currentTime);
  })

  const onTimeUpdate = checkIfRefElementExists(audioRef, (element) => {
    setCurrentTime(element.currentTime);
  })

  useEffect(() => {
    const element = audioRef.current

    if (element) {
      const mergedOptions = { ...defaultOptions, ...options }

      element.loop = mergedOptions.loop
      element.muted = mergedOptions.muted
      element.volume = mergedOptions.volume
      element.playbackRate = mergedOptions.playbackRate

      setLoop(element.loop);
      setMuted(element.muted);
      setVolume(element.volume);
      setPlaybackRate(element.playbackRate);

      element.addEventListener('loadeddata', onLoadedData);
      element.addEventListener('timeupdate', onTimeUpdate);
    }

    return () => {
      if (element) {
        element.removeEventListener('loadeddata', onLoadedData);
        element.removeEventListener('timeupdate', onTimeUpdate);
      }
      pause();
    }
  }, [])

  const controls = Object.freeze<AudioControls>({
    seek,
    play,
    mute,
    pause,
    unmute,
    setVolume: changeVolume
  })

  const state: AudioState = {
    loop,
    muted,
    volume,
    duration,
    isPlaying,
    currentTime,
    playbackRate,
  }

  return [state, controls, audioRef] as [AudioState, Readonly<AudioControls>, MutableRefObject<HTMLAudioElement>]
}

export interface AudioState {
  loop: boolean
  muted: boolean
  volume: number
  duration: number
  isPlaying: boolean
  currentTime: number
  playbackRate: number
}

export interface UseAudioOptions {
  loop?: boolean
  muted?: boolean
  volume?: number
  playbackRate?: number
}

export interface AudioControls {
  play: () => void
  mute: () => void
  pause: () => void
  unmute: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
}

export default useAudio