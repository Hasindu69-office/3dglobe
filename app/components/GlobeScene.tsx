"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ports } from "../data/ports";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function GlobeScene() {
  const globeRef = useRef<any>(null);
  const [hoverPort, setHoverPort] = useState(null);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);
    }
  }, []);

  // ✅ Each port connects to all other ports
  const arcsData = ports.flatMap((start) =>
  ports
    .filter((end) => end.name !== start.name)
    .map((end) => ({
      startLat: start.lat,
      startLng: start.lng,
      endLat: end.lat,
      endLng: end.lng,
      color: ["#ff9900", "#ffcc00"], // ✅ glowing orange to yellow
        }))
    );


  return (
    <div className="relative w-full h-screen bg-black" style={{ backgroundColor: "#00112e" }}>
      <Globe
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
        //backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={ports}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointAltitude={0.0005}
        pointColor={() => "#ff9900"}
        pointRadius={0.5}
        pointLabel={(d) => d.name}
        onPointHover={setHoverPort}
        arcsData={arcsData}
        arcColor={(d) => d.color}
        arcDashLength={0.2} // ✅ dotted
        arcDashGap={1.5}     // ✅ spacing between dots
        arcDashAnimateTime={3500} // ✅ slower
        arcDashInitialGap={() => Math.random() * 100}
        arcStroke={0.2}
        arcAltitude={0.3}
        />
    </div>
  );
}
