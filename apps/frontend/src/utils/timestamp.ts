// Simple utility for converting Firestore timestamps

/**
 * Converts Firestore timestamp to JavaScript Date
 * @param firestoreTimestamp - Firestore timestamp object with _seconds and _nanoseconds
 * @returns JavaScript Date object
 */
export function convertFirestoreTimestamp(firestoreTimestamp: any): Date {
  // If it's a Firestore timestamp object
  if (firestoreTimestamp && typeof firestoreTimestamp === 'object' && '_seconds' in firestoreTimestamp) {
    // Convert seconds to milliseconds and add nanoseconds as milliseconds
    const milliseconds = firestoreTimestamp._seconds * 1000 + Math.floor(firestoreTimestamp._nanoseconds / 1000000);
    return new Date(milliseconds);
  }
  
  // Fallback - return current date if not a Firestore timestamp
  return new Date();
}

/**
 * Converts API response parameters to proper Parameter objects
 * @param apiParameter - Raw parameter from API
 * @returns Parameter with converted timestamps
 */
export function correctDateFormat(apiParameter: any): import('../types/parameter').Parameter {
  return {
    ...apiParameter,
    createdAt: apiParameter.createdAt ? convertFirestoreTimestamp(apiParameter.createdAt) : undefined,
    updatedAt: apiParameter.updatedAt ? convertFirestoreTimestamp(apiParameter.updatedAt) : undefined
  };
}