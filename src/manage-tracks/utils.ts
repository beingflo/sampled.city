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
      lat: trkpt?.attributes["lat"].value,
      lon: trkpt?.attributes["lon"].value,
      elevation: trkpt?.children[0].innerHTML,
      time: trkpt?.children[1].innerHTML,
      heartRate: trkpt?.children[2]?.children[0]?.children[0].innerHTML,
    });
  }

  return { name, time, type, trackPoints };
};

export const getBoundingBox = (
  tracks: Array<Track>
): [number, number, number, number] => {
  let minLon = 100;
  let maxLon = 0;
  let minLat = 100;
  let maxLat = 0;

  tracks.forEach((track) => {
    track.trackPoints.forEach((point) => {
      const lat = parseFloat(point.lat);
      const lon = parseFloat(point.lon);
      if (lat > maxLat) {
        maxLat = lat;
      }
      if (lat < minLat) {
        minLat = lat;
      }
      if (lon > maxLon) {
        maxLon = lon;
      }
      if (lon < minLon) {
        minLon = lon;
      }
    });
  });
  return [minLon, maxLon, minLat, maxLat];
};

export const coord2canvas = (
  cx: number,
  cy: number,
  width: number,
  height: number,
  minLon: number,
  maxLon: number,
  minLat: number,
  maxLat: number,
  p: number
): [number, number] => {
  const px = ((minLon - cx) / (minLon - maxLon)) * (width - p) + p / 2;
  const py = ((maxLat - cy) / (maxLat - minLat)) * (height - p) + p / 2;
  return [px, py];
};
