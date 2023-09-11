export type Track = {
  name: string;
  type: string;
  time: string;
  trackPoints: Array<TrackPoint>;
};

export type TrackPoint = {
  time: string;
  lat: string;
  lon: string;
  elevation: number;
  heartRate: number;
};
