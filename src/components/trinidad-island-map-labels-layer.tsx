import {
  projectTrinidadLabel,
  tobagoLabels,
  trinidadCityLabels,
  trinidadSurroundingLabels
} from "@/lib/trinidad-island-map-labels";

/** Trinidad & Tobago island labels · red white black map · CaribbeanFreedomArena header */
export function TrinidadIslandMapLabelsLayer() {
  return (
    <g className="cfa-trinidad-island-labels">
      {trinidadSurroundingLabels.map((label) => {
        const point = projectTrinidadLabel(label);
        return (
          <text
            key={label.name}
            className="cfa-trinidad-island-micro-water"
            x={point.x + (label.dx ?? 0)}
            y={point.y + (label.dy ?? 0)}
            textAnchor={label.anchor ?? "middle"}
            dominantBaseline="middle"
          >
            {label.name}
          </text>
        );
      })}

      {[...trinidadCityLabels, ...tobagoLabels].map((city) => {
        const point = projectTrinidadLabel(city);
        return (
          <g key={city.name} className="cfa-trinidad-island-micro-city-group">
            {city.capital ? (
              <path
                className="cfa-trinidad-island-micro-capital-star"
                d={`M ${point.x} ${point.y - 5} l1.5 3.1 3.4 0.5 -2.5 2.4 0.6 3.4 -3.1 -1.6 -3.1 1.6 0.6 -3.4 -2.5 -2.4 3.4 -0.5 z`}
              />
            ) : city.name !== "Tobago" ? (
              <circle className="cfa-trinidad-island-micro-dot" cx={point.x} cy={point.y} r="1.5" />
            ) : null}
            <text
              className={`cfa-trinidad-island-micro-city ${city.capital ? "cfa-trinidad-island-micro-city-capital" : ""} ${city.name === "Tobago" ? "cfa-trinidad-island-micro-country" : ""}`}
              x={point.x + (city.dx ?? 0)}
              y={point.y + (city.dy ?? 0)}
              textAnchor={city.anchor ?? "middle"}
              dominantBaseline="middle"
            >
              {city.name}
            </text>
          </g>
        );
      })}
    </g>
  );
}
