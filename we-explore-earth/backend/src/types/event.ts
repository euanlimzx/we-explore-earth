// Tags selection state - each option explicitly stored as true/false
export interface EventTagsSelection {
  [fieldName: string]: {
    [optionName: string]: boolean;
  };
}

export interface Event {
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