import { v4 as uuid } from 'uuid';
import { db } from '../models/db.js';

export const listFaculty = (req, res) => {
  res.json(db.faculty.map(serialize));
};

export const getFaculty = (req, res) => {
  const f = db.faculty.find((x) => x.id === req.params.id);
  if (!f) return res.status(404).json({ error: 'Not found' });
  res.json(serialize(f));
};

export const updateFaculty = (req, res) => {
  const payload = req.body.id ? req.body : { id: uuid(), ...req.body };
  const idx = db.faculty.findIndex((x) => x.id === payload.id);
  if (idx === -1) db.faculty.push({ ...payload, availability: toSetMap(payload.availability) });
  else db.faculty[idx] = { ...db.faculty[idx], ...payload, availability: toSetMap(payload.availability || db.faculty[idx].availability) };
  const f = db.faculty.find((x) => x.id === payload.id);
  res.json(serialize(f));
};

export const deleteFaculty = (req, res) => {
  const idx = db.faculty.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.faculty.splice(idx, 1);
  res.status(204).end();
};

export const setAvailability = (req, res) => {
  const f = db.faculty.find((x) => x.id === req.params.id);
  if (!f) return res.status(404).json({ error: 'Not found' });
  f.availability = toSetMap(req.body.availability);
  res.json(serialize(f));
};

function toSetMap(obj) {
  if (!obj) return {};
  const out = {};
  Object.entries(obj).forEach(([d, arr]) => {
    out[d] = new Set(arr);
  });
  return out;
}

function serialize(f) {
  const availability = {};
  Object.entries(f.availability || {}).forEach(([d, set]) => {
    availability[d] = Array.from(set);
  });
  return { ...f, availability };
}



