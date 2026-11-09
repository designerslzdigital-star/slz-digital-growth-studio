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
    const current = poly[i];
    const previous = poly[j];
    if (!current || !previous) continue;
    const [xi, yi] = current;
    const [xj, yj] = previous;
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

const IRELAND: Poly = [[-10.5,51.5],[-9.5,53.5],[-8.5,55.3],[-6.2,55.1],[-6,53],[-7,52],[-9,51.4]];
const URUGUAY: Poly = [[-58.4,-30.2],[-56.9,-30.1],[-53.1,-32.7],[-53.4,-34.3],[-56.2,-35],[-58.5,-33]];
const COUNTRIES = [BRAZIL, IRELAND, URUGUAY];
const DOTS: { x: number; y: number; country: number; alternate: boolean }[] = [];
for (let lat = 80, row=0; lat > -56; lat -= 2.2,row++) {
  for (let lon = -170,col=0; lon < 180; lon += 2.2,col++) {
    if (inside([lon,lat],IRELAND) || inside([lon,lat],URUGUAY)) continue;
    const br=inside([lon,lat],BRAZIL);
    if (br || LAND.some(poly => inside([lon,lat],poly))) DOTS.push({x:lon+180,y:83-lat,country:br ? 0 : -1,alternate:(row+col)%2===0});
  }
}
for (const country of [1,2]) {
  const poly=COUNTRIES[country];
  if (!poly) continue;
  const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);
  for(let lat=Math.min(...ys),row=0;lat<=Math.max(...ys);lat+=.85,row++) {
    for(let lon=Math.min(...xs),col=0;lon<=Math.max(...xs);lon+=.85,col++) {
      if(inside([lon,lat],poly)) DOTS.push({x:lon+180,y:83-lat,country,alternate:(row+col)%2===0});
    }
  }
}
const CLASSES=[['map-br-a','map-br-b'],['map-ie-a','map-ie-b'],['map-uy-a','map-uy-b']];
export function WorldMap({ label,names }: { label: string; names: string[] }) {
  return <svg role="img" aria-label={label} viewBox="0 0 360 145" className="h-auto w-full">
    {DOTS.map((d,i)=><circle key={i} cx={d.x} cy={d.y} r={d.country>0 ? 1.2 : 1} className={d.country<0 ? 'map-world' : CLASSES[d.country]?.[d.alternate ? 0 : 1]} />)}
    <ellipse cx="127" cy="98" rx="24" ry="27" className="map-ring map-ring-br" />
    <circle cx="172" cy="30" r="5.5" className="map-ring map-ring-ie" />
    <circle cx="124" cy="116" r="6" className="map-ring map-ring-uy" />
    <path d="M176 27 L190 16 H212" className="map-ring map-ring-ie" /><text x="191" y="13" className="map-country-label">{names[1]}</text>
    <path d="M120 118 L101 133 H79" className="map-ring map-ring-uy" /><text x="79" y="141" className="map-country-label">{names[2]}</text>
    <text x="143" y="101" className="map-country-label">{names[0]}</text>
  </svg>;
}
