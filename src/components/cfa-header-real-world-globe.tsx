import {
  CFA_CARIBBEAN_GLOBE_NATIONS,
  caribbeanGlobeLngLatPercent
} from "@/lib/cfa-header-caribbean-globe";

/** Caribbean nations + exact Trinidad island · rotating globe · CFA elite header */
export function CfaHeaderRealWorldGlobe() {
  return (
    <div
      className="cfa-real-world-globe"
      role="img"
      aria-label="Caribbean nations rotating globe with Trinidad and Tobago"
    >
      <div className="cfa-real-world-globe-atmosphere" aria-hidden="true" />
      <div className="cfa-real-world-globe-body">
        <div className="cfa-real-world-globe-map-wrap" aria-hidden="true">
          <div className="cfa-caribbean-globe-rotator">
            <img
              src="/cfa-earth-daymap.jpg"
              alt=""
              className="cfa-real-world-globe-map"
              draggable={false}
            />
            <div className="cfa-caribbean-globe-surface">
              {CFA_CARIBBEAN_GLOBE_NATIONS.map((nation) => {
                const { left, top } = caribbeanGlobeLngLatPercent(nation.lng, nation.lat);

                if (nation.exactIslandMap) {
                  return (
                    <div
                      key={nation.id}
                      className="cfa-caribbean-globe-tt-exact"
                      style={{ left: `${left}%`, top: `${top}%` }}
                      title={nation.label}
                    >
                      <img src="/trinidad-tobago-flag-map.png" alt="" draggable={false} />
                    </div>
                  );
                }

                return (
                  <span
                    key={nation.id}
                    className="cfa-caribbean-globe-nation"
                    style={{ left: `${left}%`, top: `${top}%` }}
                    title={nation.label}
                  >
                    {nation.flag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="cfa-real-world-globe-shine" aria-hidden="true" />
        <div className="cfa-real-world-globe-rim" aria-hidden="true" />
      </div>
    </div>
  );
}
