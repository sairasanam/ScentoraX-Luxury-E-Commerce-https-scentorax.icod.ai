import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.get('/wishlist', authMiddleware, userController.getWishlist);
router.post('/wishlist/:productId', authMiddleware, userController.addToWishlist);
router.delete('/wishlist/:productId', authMiddleware, userController.removeFromWishlist);

export default router;
