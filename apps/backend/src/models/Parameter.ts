// Parameter model for Firestore
export interface Parameter {
  id: string; // Document ID
  parameterKey: string;
  value: string | number | boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}