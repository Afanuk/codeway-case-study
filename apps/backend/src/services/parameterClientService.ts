// Simple parameter service for managing Firestore parameters
import { db } from '../config/firebase';
import { Parameter } from '../models/Parameter';

// Get all parameters in JSON format
export const getAllParametersClient = async (country: string) => {
  // Fetch all parameters
  const snapshot = await db.collection('parameters').get();
  
  // Convert to JSON object
  const JSONConfig: { [key: string]: any } = {};
  const countryCode = country.toUpperCase();
  
  snapshot.forEach(doc => {
    const data = doc.data() as Parameter;
    if (data.parameterKey) {
      if (data.value[countryCode] !== undefined) {
        JSONConfig[data.parameterKey] = data.value[countryCode];
      } else {
        JSONConfig[data.parameterKey] = data.value['default'] || data.value;  
      }
    }
  });

  return JSONConfig;
};

// Get parameter by key
export const getParameterByKeyClient = async (key: string, country: string) => {
  const snapshot = await db.collection('parameters').where('parameterKey', '==', key).limit(1).get();
  
  if (snapshot.empty) {
    return null;
  }

  // Create JSON config
  const JSON: { [key: string]: any } = {};
  const countryCode = country.toUpperCase();

  const doc = snapshot.docs[0];
  if (doc.data().value[countryCode] !== undefined) {
    JSON[doc.data().parameterKey] = doc.data().value[countryCode];
  } else {
    JSON[doc.data().parameterKey] = doc.data().value['default'] || doc.data().value;  
  }

  return JSON;
};
