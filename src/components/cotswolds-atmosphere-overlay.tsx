"use client";

const snowFlakes = [
  { left: "3%", size: 3, duration: 3.4, delay: 0, drift: 8 },
  { left: "11%", size: 2, duration: 4.2, delay: 0.6, drift: -6 },
  { left: "19%", size: 4, duration: 3.1, delay: 1.2, drift: 10 },
  { left: "27%", size: 2, duration: 4.6, delay: 0.3, drift: -9 },
  { left: "35%", size: 3, duration: 3.8, delay: 1.8, drift: 7 },
  { left: "43%", size: 2, duration: 4.1, delay: 0.9, drift: -5 },
  { left: "51%", size: 4, duration: 3.3, delay: 2.1, drift: 11 },
  { left: "59%", size: 2, duration: 4.4, delay: 0.4, drift: -7 },
  { left: "67%", size: 3, duration: 3.6, delay: 1.5, drift: 6 },
  { left: "75%", size: 2, duration: 4.8, delay: 0.7, drift: -8 },
  { left: "83%", size: 4, duration: 3.2, delay: 2.4, drift: 9 },
  { left: "91%", size: 2, duration: 4.0, delay: 1.1, drift: -6 },
  { left: "97%", size: 3, duration: 3.9, delay: 0.2, drift: 5 },
  { left: "8%", size: 2, duration: 4.5, delay: 2.8, drift: -10 },
  { left: "46%", size: 2, duration: 3.7, delay: 1.4, drift: 8 },
  { left: "72%", size: 3, duration: 4.3, delay: 2.0, drift: -4 }
];

const blowingLeaves = [
  { top: "4%", size: 18, duration: 9, delay: 0 },
  { top: "8%", size: 22, duration: 11, delay: 1.2 },
  { top: "12%", size: 16, duration: 8.5, delay: 2.4 },
  { top: "6%", size: 20, duration: 10, delay: 3.6 },
  { top: "16%", size: 24, duration: 12, delay: 0.8 },
  { top: "20%", size: 17, duration: 9.5, delay: 4.2 },
  { top: "10%", size: 19, duration: 10.5, delay: 5.1 },
  { top: "24%", size: 21, duration: 11.5, delay: 1.8 },
  { top: "14%", size: 15, duration: 8, delay: 3.2 },
  { top: "18%", size: 23, duration: 10.8, delay: 6.0 },
  { top: "22%", size: 18, duration: 9.2, delay: 2.9 },
  { top: "26%", size: 20, duration: 11.2, delay: 4.8 }
];

const patrolDrones = [
  { id: 1, top: "6%", duration: 14, delay: 0 },
  { id: 2, top: "34%", duration: 18, delay: 4.5 },
  { id: 3, top: "58%", duration: 16, delay: 9 }
];

export function CotswoldsAtmosphereOverlay() {
  return (
    <div className="cotswolds-atmosphere" aria-hidden="true">
      <div className="cotswolds-atmosphere-snow">
        {snowFlakes.map((flake, index) => (
          <span
            key={`snow-${index}`}
            className="cotswolds-atmosphere-snowflake"
            style={{
              left: flake.left,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              ["--cotswolds-snow-drift" as string]: `${flake.drift}px`
            }}
          />
        ))}
      </div>

      <div className="cotswolds-atmosphere-top">
        <div className="cotswolds-atmosphere-leaves">
          {blowingLeaves.map((leaf, index) => (
            <span
              key={`leaf-${index}`}
              className="cotswolds-atmosphere-leaf"
              style={{
                top: leaf.top,
                fontSize: `${leaf.size}px`,
                animationDuration: `${leaf.duration}s`,
                animationDelay: `${leaf.delay}s`
              }}
            >
              🍁
            </span>
          ))}
        </div>
      </div>

      <div className="cotswolds-atmosphere-sky">
        {patrolDrones.map((drone) => (
          <div
            key={drone.id}
            className="cotswolds-drone-patrol"
            style={{
              top: drone.top,
              animationDuration: `${drone.duration}s`,
              animationDelay: `${drone.delay}s`
            }}
          >
            <div className="cotswolds-drone">
              <span className="cotswolds-drone-arm cotswolds-drone-arm-left" />
              <span className="cotswolds-drone-arm cotswolds-drone-arm-right" />
              <span className="cotswolds-drone-body" />
              <span className="cotswolds-drone-snow-spray" />
              <span className="cotswolds-drone-snow-spray cotswolds-drone-snow-spray-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
