import express from 'express';
import { userController } from '../controllers/userController.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import roleFromDbMiddleware from '../middlewares/roleFromDbMiddleware.js';

const router = express.Router();

router.post(
    '/registration',
    [
      body('email').isEmail(),
      body('password').isLength({ min: 1, max: 150 }),
    ],
    userController.registration
  );

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, roleFromDbMiddleware, roleMiddleware('admin'), userController.getUsers); // only admin can use t route
router.post('/updateUserRole', authMiddleware, roleFromDbMiddleware, roleMiddleware('admin'), userController.updateUserRole);
router.delete('/deleteUser/:userId', authMiddleware, roleFromDbMiddleware, roleMiddleware('admin'), userController.deleteUser);
export default router;