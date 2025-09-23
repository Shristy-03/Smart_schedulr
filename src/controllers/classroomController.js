import { v4 as uuid } from 'uuid';
import { db } from '../models/db.js';

export const listClassrooms = (req, res) => {
  res.json(db.classrooms.map(serializeAvailability));
};

export const createClassroom = (req, res) => {
  const { name, capacity, type } = req.body;
  const classroom = { id: uuid(), name, capacity, type, availability: cloneAvailability(db.classrooms[0]?.availability) };
  db.classrooms.push(classroom);
  res.status(201).json(serializeAvailability(classroom));
};

export const getClassroom = (req, res) => {
  const c = db.classrooms.find((x) => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(serializeAvailability(c));
};

export const updateClassroom = (req, res) => {
  const idx = db.classrooms.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.classrooms[idx] = { ...db.classrooms[idx], ...req.body };
  res.json(serializeAvailability(db.classrooms[idx]));
};

export const deleteClassroom = (req, res) => {
  const idx = db.classrooms.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.classrooms.splice(idx, 1);
  res.status(204).end();
};

function serializeAvailability(c) {
  const availability = {};
  Object.entries(c.availability || {}).forEach(([d, set]) => {
    availability[d] = Array.from(set);
  });
  return { ...c, availability };
}

function cloneAvailability(source) {
  if (!source) return {};
  const out = {};
  Object.entries(source).forEach(([d, set]) => {
    out[d] = new Set(Array.from(set));
  });
  return out;
}


