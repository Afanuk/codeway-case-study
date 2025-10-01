import express from 'express';
import { authenticateFirebaseToken, authenticateApiToken } from '../middleware/authenticateToken';
import { 
  getAllParametersPanel, 
  getParameterById,
  getParameterByKey,
  createParameter,
  updateParameter,
  deleteParameter
} from '../controllers/parameterPanelController';
import { getAllParametersClient, getParameterByKeyClient } from '../controllers/parameterClientController';

const router = express.Router();

// Specific routes first so that /config and /key/:key are not treated as IDs
// Mobile client routes (API token auth)
router.get('/config', authenticateApiToken, getAllParametersClient);
router.get('/config/:key', authenticateApiToken, getParameterByKeyClient);

// Panel routes(Firebase auth)
router.get('/key/:key', authenticateFirebaseToken, getParameterByKey);
router.post('/', authenticateFirebaseToken, createParameter);              
router.put('/:id', authenticateFirebaseToken, updateParameter);                     
router.get('/', authenticateFirebaseToken, getAllParametersPanel);              
router.delete('/:id', authenticateFirebaseToken, deleteParameter);
router.get('/:id', authenticateFirebaseToken, getParameterById);  

export default router;