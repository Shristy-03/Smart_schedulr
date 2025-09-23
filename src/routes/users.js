import { Router } from 'express';
import { authMiddleware } from '../utils/auth.js';
import { listUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

router.use(authMiddleware(['admin']));

router.get('/', listUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;


