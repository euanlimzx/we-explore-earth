//We have to make out own firestore timestamp because /shared/types doesn't have firebase node modules local to it
export interface FirestoreTimestamp {
    _seconds: number;
    _nanoseconds: number;
}
  
  
export type RSVPStatus = 'YES' | 'MAYBE';

export interface EventRSVP {
    userID: string;
    status: RSVPStatus;
}
  
export interface NewEvent {
    title: string;
    description: string;
    timeStart: FirestoreTimestamp;
    timeEnd: FirestoreTimestamp;
    location: string;
    capacity: number,
    price: number;
    category: string[];
    attendees: EventRSVP[];
}

export interface Event extends NewEvent {
    id: string;
}