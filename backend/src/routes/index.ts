import { Router } from 'express';
import orderRoutes from './order';
import productRoutes from './product';

const router = Router();

router.use('/order', orderRoutes);
router.use('/product', productRoutes);

export default router;