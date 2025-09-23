import { Router } from 'express';
import { authMiddleware } from '../utils/auth.js';
import { listClassrooms, createClassroom, getClassroom, updateClassroom, deleteClassroom } from '../controllers/classroomController.js';

const router = Router();

router.use(authMiddleware(['admin']));

router.get('/', listClassrooms);
router.post('/', createClassroom);
router.get('/:id', getClassroom);
router.put('/:id', updateClassroom);
router.delete('/:id', deleteClassroom);

export default router;


