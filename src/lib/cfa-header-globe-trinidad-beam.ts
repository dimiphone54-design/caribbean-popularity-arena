/** Measured white stream · globe rim → Trinidad island anchor */
export type GlobeTrinidadJoinLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
};

/** Globe rim (toward active slot map) → nation anchor · frame pixel coords */
export function measureGlobeTrinidadJoinLine(frame: Element): GlobeTrinidadJoinLine | null {
  const globe = frame.querySelector(".cfa-real-world-globe-body");
  const map = frame.querySelector(".cfa-elite-ai-header-slot-map");
  const anchor = frame.querySelector("#cfa-slot-join-anchor");

  if (!(globe instanceof HTMLElement) || !(map instanceof SVGSVGElement) || !anchor) {
    return null;
  }

  const fr = frame.getBoundingClientRect();
  const gr = globe.getBoundingClientRect();

  const cx = parseFloat(anchor.getAttribute("cx") ?? "291");
  const cy = parseFloat(anchor.getAttribute("cy") ?? "432");
  const pt = map.createSVGPoint();
  pt.x = cx;
  pt.y = cy;
  const ctm = map.getScreenCTM();
  if (!ctm) return null;

  const end = pt.matrixTransform(ctm);
  const endX = end.x - fr.left;
  const endY = end.y - fr.top;

  const globeCx = gr.left + gr.width / 2 - fr.left;
  const globeCy = gr.top + gr.height / 2 - fr.top;
  const radius = Math.min(gr.width, gr.height) / 2;
  const angle = Math.atan2(endY - globeCy, endX - globeCx);
  const sx = globeCx + Math.cos(angle) * radius * 0.98;
  const sy = globeCy + Math.sin(angle) * radius * 0.98;

  return {
    x1: sx,
    y1: sy,
    x2: endX,
    y2: endY,
    width: fr.width,
    height: fr.height
  };
}
