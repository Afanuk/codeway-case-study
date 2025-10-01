// Simple parameter service for managing Firestore parameters
import { db } from '../config/firebase';
import { Parameter } from '../models/Parameter';

// Get all parameters in JSON format
export const getAllParametersClient = async () => {
  // Fetch all parameters
  const snapshot = await db.collection('parameters').get();
  
  // Convert to JSON object
  const JSONConfig: { [key: string]: any } = {};
  snapshot.forEach(doc => {
    const data = doc.data() as Parameter;
    if (data.parameterKey) {
      JSONConfig[data.parameterKey] = data.value;
    } 
  });

  return JSONConfig;
};

// Get parameter by key
export const getParameterByKeyClient = async (key: string) => {
  const snapshot = await db.collection('parameters').where('parameterKey', '==', key).limit(1).get();
  
  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    parameterKey: doc.data().parameterKey,
    value: doc.data().value,
  };
};
