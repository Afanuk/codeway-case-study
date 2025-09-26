// Parameter routes
import express from 'express';
import { 
  getAllParameters, 
  getParameterByKey, 
  getParameterById, 
  createParameter,     // Renamed from insertParameter
  updateParameter,
  deleteParameter      // Added missing route
} from '../controllers/parameterController.js';

const router = express.Router();

// CRUD operations for parameters
router.post('/', createParameter);              // POST /api/parameters
router.get('/', getAllParameters);              // GET /api/parameters  
router.get('/key/:key', getParameterByKey);     // GET /api/parameters/key/:key
router.get('/:id', getParameterById);           // GET /api/parameters/:id
router.put('/:id', updateParameter);            // PUT /api/parameters/:id
router.delete('/:id', deleteParameter);         // DELETE /api/parameters/:id

export default router;