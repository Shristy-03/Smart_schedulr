import { v4 as uuid } from 'uuid';
import { db } from '../models/db.js';

export const listCourses = (req, res) => {
  res.json(db.courses);
};

export const createCourse = (req, res) => {
  const course = { id: uuid(), ...req.body };
  db.courses.push(course);
  res.status(201).json(course);
};

export const getCourse = (req, res) => {
  const course = db.courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Not found' });
  res.json(course);
};

export const updateCourse = (req, res) => {
  const idx = db.courses.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.courses[idx] = { ...db.courses[idx], ...req.body };
  res.json(db.courses[idx]);
};

export const deleteCourse = (req, res) => {
  const idx = db.courses.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.courses.splice(idx, 1);
  res.status(204).end();
};


