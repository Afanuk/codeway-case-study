// Parameter type definition
export interface Parameter {
  id: string;               // Firestore document ID
  parameterKey: string;     // Unique key for the parameter
  value: string;   // Value of the parameter
  description?: string;     // Optional description
  createdAt?: Date;         // Timestamp of creation
  updatedAt?: Date;         // Timestamp of last update
}