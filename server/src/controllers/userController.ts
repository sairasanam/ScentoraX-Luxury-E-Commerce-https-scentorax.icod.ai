import type { Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import * as authService from '../services/authService';
import type { AuthRequest } from '../middleware/authMiddleware';

export async function getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await authService.getUserById(req.user!._id.toString());
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await authService.updateProfile(req.user!._id.toString(), req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

export async function getWishlist(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const wishlist = await userService.getWishlist(req.user!._id.toString());
    res.json({ success: true, data: wishlist });
  } catch (err) {
    next(err);
  }
}

export async function addToWishlist(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    await userService.addToWishlist(req.user!._id.toString(), req.params.productId);
    res.json({ success: true, message: 'Added to wishlist' });
  } catch (err) {
    next(err);
  }
}

export async function removeFromWishlist(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    await userService.removeFromWishlist(req.user!._id.toString(), req.params.productId);
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (err) {
    next(err);
  }
}
