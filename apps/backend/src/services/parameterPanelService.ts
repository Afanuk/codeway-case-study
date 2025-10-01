// Simple parameter service for managing Firestore parameters
import { db } from '../config/firebase';
import { Parameter } from '../models/Parameter';

// Create a new parameter
export const createParameter = async (paramData: Partial<Parameter>) => {
  // Check if parameter with same key already exists
  if (paramData.parameterKey) {
    const existingParam = await getParameterByKey(paramData.parameterKey);
    if (existingParam) {
      throw new Error(`Parameter with key '${paramData.parameterKey}' already exists`);
    }
  }

  // Add timestamps
  paramData.createdAt = new Date();
    
  // Save to database
  const docRef = await db.collection('parameters').add(paramData);
  
  // Return the created parameter with ID
  return {
    id: docRef.id,
    ...paramData
  };
};

// Update parameter
export const updateParameter = async (id: string, updates: Partial<Parameter>, country: string) => {
  // Add update timestamp
  updates.updatedAt = new Date();
  
  // Fetch existing document
  const existingDoc = await db.collection('parameters').doc(id).get();
  if (!existingDoc.exists) {
    throw new Error('Parameter not found');
  }
  const existingData = existingDoc.data() as Parameter;
  
  // If value being updated is null, delete that country's entry
  if (updates.value && updates.value[country] === null) {
    // Prevent deletion of default value
    if (country === 'default') {
      throw new Error('Cannot delete default value - it is required');
    }
    const newValue = { ...existingData.value };
    delete newValue[country];
    updates.value = newValue;
  }
  // Handle all country updates and also adding new country values
  if (updates.value && updates.value[country] !== null) {
    const newValue = { ...existingData.value };
    newValue[country] = updates.value[country];
    updates.value = newValue;
  }

  // Update the document
  await db.collection('parameters').doc(id).update(updates);
  
  // Get and return the updated document
  const doc = await db.collection('parameters').doc(id).get();
  return { id: doc.id, ...doc.data() };
};

// Get all parameters
export const getAllParametersPanel = async () => {
  const snapshot = await db.collection('parameters').get();
  const parameters: Parameter[] = [];
  
  snapshot.forEach(doc => {
    parameters.push({
      id: doc.id,
      ...doc.data()
    } as Parameter);
  });
  
  return parameters;
};

// Get parameter by ID
export const getParameterById = async (id: string) => {
  const doc = await db.collection('parameters').doc(id).get();
  
  if (!doc.exists) {
    return null;
  }
  
  return { id: doc.id, ...doc.data() };
};

// Get parameter by key
export const getParameterByKey = async (key: string) => {
  const snapshot = await db.collection('parameters')
    .where('parameterKey', '==', key)
    .get();
  
  if (snapshot.empty) {
    return null;
  }
  
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

// Delete a parameter
export const deleteParameter = async (id: string) => {
  await db.collection('parameters').doc(id).delete();
  return true;
};
