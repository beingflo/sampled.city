import type { Component } from "solid-js";
import { onMount } from "solid-js";
import { coord2canvas, getBoundingBox } from "./manage-tracks/utils";
import { Track } from "./types";
import { useStore } from "./store";

export const ViewTracks: Component = () => {
  const [state] = useStore();
  const tracks = state.tracks as Array<Track>;
  const [minLon, maxLon, minLat, maxLat] = getBoundingBox(tracks ?? []);
  const [width, height] = [600, 600];

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    tracks?.forEach((track) => {
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
      <canvas ref={canvas} width="600px" height="600px" />
    </div>
  );
};
