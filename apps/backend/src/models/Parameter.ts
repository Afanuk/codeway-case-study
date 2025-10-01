// Parameter model for Firestore
export interface Parameter {
  id?: string; // Document ID
  parameterKey: string;
  value: {
    default: string | number | boolean;
    [countryCode: string]: string | number | boolean;
  }
  description?: string;
  createdBy?: string; // User ID of the creator
  updatedBy?: string; // User ID of the last updater
  createdAt: Date;
  updatedAt?: Date;
}