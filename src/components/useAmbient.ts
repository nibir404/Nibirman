"use client";

import { useCallback, useRef, useState } from "react";

/**
 * A soft generated ambient pad (Web Audio, no audio files).
 * Swap for a real soundtrack by dropping /public/audio/theme.mp3 and using an <audio> element.
 */
export function useAmbient() {
  const ctx = useRef<AudioContext | null>(null);
  const gain = useRef<GainNode | null>(null);
  const [on, setOn] = useState(false);

  const start = () => {
    const ac = new AudioContext();
    const g = ac.createGain();
    g.gain.value = 0;
    const filter = ac.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.connect(g).connect(ac.destination);
    // A-major-ish chord, slightly detuned saws → dreamy anime pad
    [220, 277.18, 329.63, 440, 554.37].forEach((f, i) => {
      const o = ac.createOscillator();
      o.type = i % 2 ? "triangle" : "sawtooth";
      o.frequency.value = f;
      o.detune.value = (Math.random() - 0.5) * 14;
      const og = ac.createGain();
      og.gain.value = 0.035;
      o.connect(og).connect(filter);
      o.start();
    });
    ctx.current = ac;
    gain.current = g;
  };

  const toggle = useCallback(() => {
    if (!ctx.current) start();
    const ac = ctx.current!;
    const g = gain.current!;
    const next = !on;
    ac.resume();
    g.gain.cancelScheduledValues(ac.currentTime);
    g.gain.linearRampToValueAtTime(next ? 0.5 : 0, ac.currentTime + 1.2);
    setOn(next);
  }, [on]);

  return { on, toggle };
}
