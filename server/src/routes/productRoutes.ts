import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.get('/', productController.getProducts);
router.get('/featured', productController.getFeatured);
router.get('/bestsellers', productController.getBestsellers);
router.get('/:slug', productController.getProductBySlug);

export default router;
