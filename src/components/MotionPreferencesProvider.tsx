"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface MotionPreferences {
  /** True when the OS requests reduced motion OR the user opted out in-app */
  reducedMotion: boolean;
  setReducedMotionOverride: (value: boolean | null) => void;
  reducedMotionOverride: boolean | null;
  /** Phase 09: audio OFF by default */
  audioEnabled: boolean;
  setAudioEnabled: (value: boolean) => void;
}

const MotionPreferencesContext = createContext<MotionPreferences>({
  reducedMotion: false,
  setReducedMotionOverride: () => {},
  reducedMotionOverride: null,
  audioEnabled: false,
  setAudioEnabled: () => {},
});

const REDUCED_MOTION_KEY = "pt-reduced-motion-override";
const AUDIO_KEY = "pt-audio-enabled";

export function MotionPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [osReducedMotion, setOsReducedMotion] = useState(false);
  const [reducedMotionOverride, setReducedMotionOverrideState] = useState<
    boolean | null
  >(null);
  const [audioEnabled, setAudioEnabledState] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOsReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);

    const motionPref = window.localStorage.getItem(REDUCED_MOTION_KEY);
    if (motionPref === "true" || motionPref === "false") {
      setReducedMotionOverrideState(motionPref === "true");
    }
    setAudioEnabledState(window.localStorage.getItem(AUDIO_KEY) === "true");

    return () => media.removeEventListener("change", update);
  }, []);

  const setReducedMotionOverride = useCallback((value: boolean | null) => {
    setReducedMotionOverrideState(value);
    if (value === null) {
      window.localStorage.removeItem(REDUCED_MOTION_KEY);
    } else {
      window.localStorage.setItem(REDUCED_MOTION_KEY, String(value));
    }
  }, []);

  const setAudioEnabled = useCallback((value: boolean) => {
    setAudioEnabledState(value);
    window.localStorage.setItem(AUDIO_KEY, String(value));
  }, []);

  const reducedMotion =
    reducedMotionOverride !== null ? reducedMotionOverride : osReducedMotion;

  return (
    <MotionPreferencesContext.Provider
      value={{
        reducedMotion,
        setReducedMotionOverride,
        reducedMotionOverride,
        audioEnabled,
        setAudioEnabled,
      }}
    >
      {children}
    </MotionPreferencesContext.Provider>
  );
}

export function useMotionPreferences() {
  return useContext(MotionPreferencesContext);
}
