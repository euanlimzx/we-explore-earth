// We have to make our own firestore timestamp because /shared/types doesn't have firebase node modules local to it
export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface EventRSVP {
  userID: string;
  status: string;
}

// Config structure received from API (event_tags document)
export interface EventTagsConfig {
  [fieldName: string]: string[];
}

// Selection state stored in form and event document
export interface EventTagsSelection {
  [fieldName: string]: {
    [optionName: string]: boolean;
  };
}

// Event interface for reading from Firestore (uses FirestoreTimestamp)
export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  timeStart: FirestoreTimestamp;
  timeEnd: FirestoreTimestamp;
  price: number;
  hostedBy: string;
  tags: EventTagsSelection;
  maxAttendees: number;
  rsvpDeadline: FirestoreTimestamp;
}

// Event data for creating/updating events (uses Date/ISO strings)
export interface CreateEventPayload {
  title: string;
  description: string;
  location: string;
  timeStart: string; // ISO string
  timeEnd: string; // ISO string
  price: number | string;
  hostedBy: string;
  tags: EventTagsSelection;
  maxAttendees: number | string;
  rsvpDeadline: string; // ISO string
}

// Event data for writing to Firestore (uses Date - Firestore converts to FirestoreTimestamp)
export interface FirestoreEventData {
  title: string;
  description: string;
  location: string;
  timeStart: Date;
  timeEnd: Date;
  price: number;
  hostedBy: string;
  tags: EventTagsSelection;
  maxAttendees: number;
  rsvpDeadline: Date;
}

// Legacy NewEvent interface (kept for backward compatibility if needed)
export interface NewEvent {
  title: string;
  description: string;
  timeStart: FirestoreTimestamp;
  timeEnd: FirestoreTimestamp;
  location: string;
  capacity: number;
  price: number;
  category: string[];
  attendees: EventRSVP[];
}

// Props for the TagSelectorModal component
export interface TagSelectorModalProps {
  visible: boolean;
  fieldName: string;
  fieldDisplayName: string;
  options: string[];
  selectedOptions: { [option: string]: boolean };
  onSave: (
    fieldName: string,
    selections: { [option: string]: boolean },
  ) => void;
  onClose: () => void;
}

// Props for TagsSection component
export interface TagsSectionProps {
  eventTagsConfig: EventTagsConfig | null;
  tagsSelection: EventTagsSelection;
  onTagsChange: (newSelection: EventTagsSelection) => void;
}
