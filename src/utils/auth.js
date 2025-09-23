import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function authMiddleware(requiredRoles = []) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
      if (!token) throw new AppError('Unauthorized', 401);
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new AppError('Forbidden', 403);
      }
      next();
    } catch (e) {
      next(e);
    }
  };
}


