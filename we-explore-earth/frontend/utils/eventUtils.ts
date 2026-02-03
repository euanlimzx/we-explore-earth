import { EventTagsConfig, EventTagsSelection } from "@shared/types/event";

// Initialize tags selection with all options set to false
export const initializeTagsSelection = (
  config: EventTagsConfig,
): EventTagsSelection => {
  const selection: EventTagsSelection = {};
  for (const [fieldName, options] of Object.entries(config)) {
    if (Array.isArray(options)) {
      selection[fieldName] = {};
      for (const option of options) {
        selection[fieldName][option] = false;
      }
    }
  }
  return selection;
};

// Helper function to combine date and time into a Date object
export const combineDateAndTime = (date: Date, time: Date): Date => {
  const combined = new Date(date);
  combined.setHours(time.getHours());
  combined.setMinutes(time.getMinutes());
  combined.setSeconds(time.getSeconds());
  combined.setMilliseconds(time.getMilliseconds());
  return combined;
};

// Convert FirestoreTimestamp to Date
// Handles FirestoreTimestamp format or ISO string format
export const timestampToDate = (timestamp: any): Date => {
  if (!timestamp) {
    return new Date(); // Return current date as fallback
  }

  // If it's a FirestoreTimestamp object with _seconds
  if (timestamp._seconds !== undefined) {
    return new Date(timestamp._seconds * 1000);
  }

  // If it's already a Date object or ISO string
  if (timestamp instanceof Date) {
    return timestamp;
  }

  // Try parsing as ISO string
  const parsed = new Date(timestamp);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  // Fallback to current date
  return new Date();
};
