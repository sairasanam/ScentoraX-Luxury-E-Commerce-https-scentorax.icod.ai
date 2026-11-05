import type { Response, NextFunction } from 'express';
import type { AuthRequest } from './authMiddleware';

export function adminMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ success: false, error: 'Admin access required', statusCode: 403 });
    return;
  }
  next();
}
