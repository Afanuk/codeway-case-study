// Parameter service for managing Firestore parameters
import { db } from '../config/firebase.js';
import { Parameter } from '../models/Parameter.js';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

const parametersCollection = collection(db, 'parameters');

// Create or update a parameter
export const insertParameter = async (param : Parameter) => {
  const paramRef = doc(parametersCollection, param.id);
  const paramSnap = await getDoc(paramRef);
  if (!paramSnap.exists()) {
    await setDoc(paramRef, { ...param });
  } else {
    await updateDoc(paramRef, { ...param });
    console.log(`Parameter with ID ${param.id} updated.`);
  }
  return { ...param } as Parameter;
}

// Update parameter
export const updateParameter = async (id: string, updates: Partial<Parameter>) => {
  const paramRef = doc(parametersCollection, id);
  await updateDoc(paramRef, updates);
  const updatedSnap = await getDoc(paramRef);
  if (updatedSnap.exists()) {
    return { id: updatedSnap.id, ...updatedSnap.data() } as Parameter;
  }
  return null;
}

// Get all parameters
export const getAllParameters = async () => {
  const paramSnap = await getDocs(parametersCollection);
  return paramSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Parameter));
}

// Get parameter by key
export const getParameterByKey = async (key: string) => {
  const paramSnap = await getDocs(query(parametersCollection, where('parameterKey', '==', key)));
  if (!paramSnap.empty) {
    const docs = paramSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Parameter[];
    return docs;
  }
  return null;
}

// Get parameter by ID
export const getParameterById = async (id: string) => {
  const paramRef = doc(parametersCollection, id);
  const paramSnap = await getDoc(paramRef);
  if (paramSnap.exists()) {
    return { id: paramSnap.id, ...paramSnap.data() } as Parameter;
  }
  return null;
}

// Delete a parameter
export const deleteParameter = async (id: string) => {
  const paramRef = doc(parametersCollection, id);
  await deleteDoc(paramRef);
}
