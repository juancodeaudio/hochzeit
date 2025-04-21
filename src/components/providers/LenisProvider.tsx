'use client';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { frame, cancelFrame } from 'framer-motion';
import { useEffect, useRef, FC } from 'react';

const LenisProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;