import { Router } from 'express';
import * as reviewController from '../controllers/reviewController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, reviewController.createReview);
router.get('/product/:productId', reviewController.getProductReviews);

export default router;
