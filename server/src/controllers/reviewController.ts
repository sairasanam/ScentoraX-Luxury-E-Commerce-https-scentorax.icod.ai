import type { Response, NextFunction } from 'express';
import * as reviewService from '../services/reviewService';
import type { AuthRequest } from '../middleware/authMiddleware';
import type { Request } from 'express';

export async function createReview(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { productId, rating, title, comment } = req.body;
    if (!productId || !rating) {
      res.status(400).json({ success: false, error: 'Product ID and rating are required', statusCode: 400 });
      return;
    }
    const review = await reviewService.createReview({
      userId: req.user!._id.toString(),
      productId,
      rating,
      title,
      comment,
    });
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
}

export async function getProductReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const reviews = await reviewService.getProductReviews(req.params.productId);
    res.json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
}
