"use client";

import { useCallback, useRef } from "react";
import { useFreedomDrive } from "@/components/freedom-drive/freedom-drive-context";

export function FreedomDriveMobileControls() {
  const { setInput } = useFreedomDrive();
  const steerRef = useRef(0);

  const setSteer = useCallback(
    (value: number) => {
      steerRef.current = value;
      setInput((prev) => ({ ...prev, steer: value }));
    },
    [setInput]
  );

  const setAccel = useCallback(
    (on: boolean) => setInput((prev) => ({ ...prev, accelerate: on })),
    [setInput]
  );

  const setBrake = useCallback(
    (on: boolean) => setInput((prev) => ({ ...prev, brake: on })),
    [setInput]
  );

  return (
    <div className="fd-mobile-controls pointer-events-auto absolute inset-x-0 bottom-0 z-30 md:hidden">
      <div className="fd-mobile-steer">
        <button
          type="button"
          className="fd-mobile-btn fd-mobile-btn-steer"
          aria-label="Steer left"
          onTouchStart={() => setSteer(-1)}
          onTouchEnd={() => setSteer(0)}
          onTouchCancel={() => setSteer(0)}
          onMouseDown={() => setSteer(-1)}
          onMouseUp={() => setSteer(0)}
          onMouseLeave={() => setSteer(0)}
        >
          ◀
        </button>
        <button
          type="button"
          className="fd-mobile-btn fd-mobile-btn-steer"
          aria-label="Steer right"
          onTouchStart={() => setSteer(1)}
          onTouchEnd={() => setSteer(0)}
          onTouchCancel={() => setSteer(0)}
          onMouseDown={() => setSteer(1)}
          onMouseUp={() => setSteer(0)}
          onMouseLeave={() => setSteer(0)}
        >
          ▶
        </button>
      </div>

      <div className="fd-mobile-pedals">
        <button
          type="button"
          className="fd-mobile-btn fd-mobile-btn-brake"
          aria-label="Brake"
          onTouchStart={() => setBrake(true)}
          onTouchEnd={() => setBrake(false)}
          onTouchCancel={() => setBrake(false)}
          onMouseDown={() => setBrake(true)}
          onMouseUp={() => setBrake(false)}
          onMouseLeave={() => setBrake(false)}
        >
          BRAKE
        </button>
        <button
          type="button"
          className="fd-mobile-btn fd-mobile-btn-gas"
          aria-label="Accelerate"
          onTouchStart={() => setAccel(true)}
          onTouchEnd={() => setAccel(false)}
          onTouchCancel={() => setAccel(false)}
          onMouseDown={() => setAccel(true)}
          onMouseUp={() => setAccel(false)}
          onMouseLeave={() => setAccel(false)}
        >
          GAS
        </button>
      </div>
    </div>
  );
}
