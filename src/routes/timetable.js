import { Router } from 'express';
import { authMiddleware } from '../utils/auth.js';
import {
  generate,
  conflicts,
  choices,
  review,
  saveTimetable,
  getApprovedTimetable,
  getTimetableByTimestamp,
  getAllApprovedChoices
} from '../controllers/timetableController.js';

const router = Router();

//router.use(authMiddleware(['admin']));

router.post('/generate', generate);
router.post('/conflicts', conflicts);
router.get('/choices', choices);
router.post('/review', review);
router.post("/approve", saveTimetable);
router.get('/approved', getApprovedTimetable);
router.get('/by-timestamp', getTimetableByTimestamp);
router.get('/all-approved', getAllApprovedChoices);




export default router;
