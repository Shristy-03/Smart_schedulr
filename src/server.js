import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import courseRoutes from './routes/courses.js';
import classroomRoutes from './routes/classrooms.js';
import facultyRoutes from './routes/faculty.js';
import timetableRoutes from './routes/timetable.js';

import { errorHandler } from './utils/errorHandler.js';

const app = express();

app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for local development
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: true, // Allow all origins for local development
  credentials: false
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/classrooms', classroomRoutes);
app.use('/faculty', facultyRoutes);
app.use('/timetable', timetableRoutes);

app.use(errorHandler);

export default app;