import { RSVPStatus } from '@shared/types/event';

export interface UserRSVP {
  eventID: string;
  status: RSVPStatus;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  notificationToken: string | null;
  isAdmin: boolean;
  events: UserRSVP[];
}
