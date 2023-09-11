import { Track } from "./types";

export const parseGPX = (content: string): Track => {
  const parser = new DOMParser();
  const result = parser.parseFromString(content, "text/xml");

  const gpx = result?.children[0];
  const trk = gpx?.children[1];
  const trkseg = trk?.children[2];

  const time = gpx?.children[0]?.children[1]?.innerHTML;
  const name = trk?.children[0]?.innerHTML;
  const type = trk?.children[1]?.innerHTML;
  const trackPoints = [];

  for (let trkpt of trkseg?.children) {
    trackPoints.push({
      lat: trkpt?.attributes["lat"],
      lon: trkpt?.attributes["lon"],
      elevation: trkpt?.children[0].innerHTML,
      time: trkpt?.children[1].innerHTML,
      heartRate: trkpt?.children[2]?.children[0]?.children[0].innerHTML,
    });
  }

  return { name, time, type, trackPoints };
};
