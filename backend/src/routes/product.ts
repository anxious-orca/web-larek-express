import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/product';
import { productValidator } from '../middlewares/validators';

const router = Router();

router.get('/', getProducts);
router.post('/', productValidator, createProduct);

export default router;
