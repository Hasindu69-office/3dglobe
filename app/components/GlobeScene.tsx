"use client"; // <- This must be the FIRST line in the file

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { ports, Port } from "../data/ports";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function GlobeScene() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = globeRef.current;
    const controls = globe.controls?.();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
    }

    globe.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);
  }, []);

  const arcsData = ports.flatMap((start: Port) =>
    ports
      .filter((end: Port) => end.name !== start.name)
      .map((end: Port) => ({
        startLat: start.lat,
        startLng: start.lng,
        endLat: end.lat,
        endLng: end.lng,
        color: ["#ff9900", "#ffcc00"],
      }))
  );

  return (
    <div className="relative w-full h-screen" style={{ backgroundColor: "#00112e" }}>
      <Globe
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
        pointsData={ports}
        pointLat={(d: object) => (d as Port).lat}
        pointLng={(d: object) => (d as Port).lng}
        pointAltitude={0.0005}
        pointColor={() => "#ff9900"}
        pointRadius={0.5}
        pointLabel={(d: object) => (d as Port).name}
       
        arcsData={arcsData}
        arcColor={(d: object) => (d as { color: string[] }).color}
        arcDashLength={0.2}
        arcDashGap={1.5}
        arcDashAnimateTime={3500}
        arcDashInitialGap={() => Math.random() * 100}
        arcStroke={0.2}
        arcAltitude={0.3}
      />
    </div>
  );
}
