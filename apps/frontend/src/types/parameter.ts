// Parameter type definition
export interface Parameter {
  id: string;               // Firestore document ID
  parameterKey: string;     // Unique key for the parameter
  value: {                  // Value can be a default or country-specific
    default: string | number | boolean;
    [countryCode: string]: string | number | boolean;
  };
  description?: string;     // Optional description
  createdBy?: string;       // User ID of the creator
  updatedBy?: string;       // User ID of the last updater
  createdAt?: Date;         // Timestamp of creation
  updatedAt?: Date;         // Timestamp of last update
}