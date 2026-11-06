// Coarse continent outlines (lon, lat) used only to place dots; illustrative, not cartographic.
type Poly = [number, number][];
const BRAZIL: Poly = [[-73, -7], [-70, 2], [-60, 5], [-51, 4], [-35, -5], [-39, -15], [-41, -22], [-48, -26], [-53, -34], [-58, -30], [-57, -22], [-62, -16], [-66, -10], [-73, -10]];
const LAND: Poly[] = [
  // North America
  [[-168, 66], [-140, 70], [-95, 72], [-80, 64], [-60, 55], [-66, 45], [-76, 35], [-81, 25], [-97, 26], [-97, 18], [-87, 15], [-78, 8], [-85, 10], [-105, 20], [-117, 32], [-125, 42], [-124, 50], [-140, 60], [-165, 60]],
  // Greenland
  [[-55, 60], [-20, 70], [-22, 82], [-60, 82], [-70, 76]],
  // South America (rest)
  [[-80, 10], [-62, 11], [-50, 4], [-35, -6], [-40, -22], [-58, -38], [-65, -55], [-72, -50], [-73, -36], [-71, -18], [-81, -5]],
  // Europe
  [[-10, 36], [-9, 44], [-4, 48], [-5, 58], [5, 62], [20, 70], [40, 68], [60, 60], [50, 45], [40, 41], [28, 36], [15, 38], [3, 42]],
  // Africa
  [[-17, 21], [-16, 12], [-8, 4], [8, 4], [12, -5], [12, -17], [18, -34], [28, -33], [40, -15], [40, -3], [51, 12], [43, 12], [33, 30], [10, 37], [-6, 36]],
  // Asia
  [[40, 41], [60, 60], [80, 73], [130, 72], [180, 68], [160, 58], [140, 50], [128, 35], [122, 25], [108, 18], [104, 2], [98, 8], [92, 22], [80, 8], [72, 20], [57, 25], [45, 13], [35, 30]],
  // Indonesia
  [[95, 5], [120, 2], [140, -3], [140, -9], [110, -8], [100, -2]],
  // Australia
  [[114, -22], [130, -12], [142, -11], [153, -27], [146, -39], [135, -35], [115, -34]],
  // UK
  [[-6, 50], [2, 51], [-2, 58], [-6, 57]],
  // Japan
  [[130, 31], [141, 36], [142, 45], [139, 40]],
  // Madagascar / NZ
  [[44, -14], [50, -15], [47, -25], [44, -22]],
  [[167, -46], [178, -38], [173, -35]],
];

function inside(p: [number, number], poly: Poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

const STEP = 3.2;
const DOTS: { x: number; y: number; br: boolean }[] = [];
for (let lat = 80; lat > -56; lat -= STEP) {
  for (let lon = -170; lon < 180; lon += STEP) {
    const br = inside([lon, lat], BRAZIL);
    if (br || LAND.some((poly) => inside([lon, lat], poly))) DOTS.push({ x: lon + 180, y: 90 - lat, br });
  }
}

export function WorldMap({ label }: { label: string }) {
  return (
    <svg role="img" aria-label={label} viewBox="0 5 360 140" className="h-auto w-full">
      {DOTS.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.br ? 1.25 : 1.05} className={d.br ? "fill-blue" : "fill-on-dark-mute/35"} />
      ))}
    </svg>
  );
}
