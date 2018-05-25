import { Router } from 'express';
import basicRoutes from './basic';
import authRoutes from './auth';
import usersRoutes from './users';

const router = new Router();

router.use('/basic', basicRoutes);
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

export default router;
