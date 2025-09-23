import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';
import { db } from '../models/db.js';

export const listUsers = (req, res) => {
  const redacted = db.users.map(({ passwordHash, ...u }) => u);
  res.json(redacted);
};

export const createUser = (req, res) => {
  const { name, email, role, password = 'password', department } = req.body;
  const exists = db.users.some((u) => u.email === email);
  if (exists) return res.status(409).json({ error: 'Email exists' });
  const user = { id: uuid(), name, email, role, department, passwordHash: bcrypt.hashSync(password, 8) };
  db.users.push(user);
  const { passwordHash, ...safe } = user;
  res.status(201).json(safe);
};

export const getUser = (req, res) => {
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  const { passwordHash, ...safe } = user;
  res.json(safe);
};

export const updateUser = (req, res) => {
  const idx = db.users.findIndex((u) => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const update = { ...db.users[idx], ...req.body };
  if (req.body.password) update.passwordHash = bcrypt.hashSync(req.body.password, 8);
  db.users[idx] = update;
  const { passwordHash, ...safe } = db.users[idx];
  res.json(safe);
};

export const deleteUser = (req, res) => {
  const idx = db.users.findIndex((u) => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.users.splice(idx, 1);
  res.status(204).end();
};



