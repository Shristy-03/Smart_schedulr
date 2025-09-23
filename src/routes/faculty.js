import { Router } from 'express';
import { authMiddleware } from '../utils/auth.js';
import { listFaculty, setAvailability, getFaculty, updateFaculty, deleteFaculty } from '../controllers/facultyController.js';

const router = Router();

router.use(authMiddleware(['admin']));

router.get('/', listFaculty);
router.post('/', updateFaculty);
router.get('/:id', getFaculty);
router.put('/:id', updateFaculty);
router.delete('/:id', deleteFaculty);
router.post('/:id/availability', setAvailability);

export default router;



