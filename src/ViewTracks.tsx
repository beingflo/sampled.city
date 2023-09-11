import type { Component } from "solid-js";
import { onMount, onCleanup } from "solid-js";
import { coord2canvas, getBoundingBox } from "./manage-tracks/utils";
import { Track } from "./manage-tracks/types";

export const ViewTracks: Component = () => {
  const tracks = JSON.parse(
    localStorage.getItem("tracks") ?? "[]"
  ) as Array<Track>;
  const [minLon, maxLon, minLat, maxLat] = getBoundingBox(tracks);
  const [width, height] = [1000, 600];

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    tracks.forEach((track) => {
      ctx.beginPath();
      track.trackPoints.forEach((p, i) => {
        const [px, py] = coord2canvas(
          parseFloat(p.lon),
          parseFloat(p.lat),
          width,
          height,
          minLon,
          maxLon,
          minLat,
          maxLat,
          20
        );
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      });
      ctx.stroke();
    });
  });

  return (
    <div class="w-screen h-screen">
      <canvas ref={canvas} width="1000px" height="600px" />
    </div>
  );
};
