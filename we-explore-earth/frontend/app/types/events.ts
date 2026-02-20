export type FirestoreTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  timeStart: FirestoreTimestamp;
  timeEnd: FirestoreTimestamp;
}