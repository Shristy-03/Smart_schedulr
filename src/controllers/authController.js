import bcrypt from 'bcryptjs';
import { db } from '../models/db.js';
import { signToken } from '../utils/auth.js';
import { AppError } from '../utils/errorHandler.js';

export const login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = db.users.find((u) => u.email === email);
    if (!user) throw new AppError('Invalid credentials', 401);
    const ok = bcrypt.compareSync(password, user.passwordHash);
    if (!ok) throw new AppError('Invalid credentials', 401);
    const token = signToken({ id: user.id, role: user.role, email: user.email, name: user.name });
    res.json({ token, user: { id: user.id, role: user.role, email: user.email, name: user.name } });
  } catch (e) {
    next(e);
  }
};


