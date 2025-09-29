// Parameter routes
import express from 'express';
import { 
  getAllParameters, 
  getParameterByKey, 
  getParameterById, 
  createParameter,     // Renamed from insertParameter
  updateParameter,
  deleteParameter      // Added missing route
} from '../controllers/parameterController';

const router = express.Router();

// CRUD operations for parameters
router.post('/', createParameter);              // POST /api/parameters
router.put('/:id', updateParameter);            // PUT /api/parameters/:id
router.get('/', getAllParameters);              // GET /api/parameters  
router.get('/:id', getParameterById);           // GET /api/parameters/:id
router.get('/key/:key', getParameterByKey);     // GET /api/parameters/key/:key
router.delete('/:id', deleteParameter);         // DELETE /api/parameters/:id

export default router;