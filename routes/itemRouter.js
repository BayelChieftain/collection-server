import express from 'express';
import { itemController } from '../controllers/itemController.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

const validateItem = [
    body('name').notEmpty().withMessage('Name is required'),
    body('collectionRef').notEmpty().withMessage('Collection reference is required').isLength({ min: 24, max: 24 }).withMessage('Invalid collection reference'),
    body('dynamicFields').notEmpty()
];

router.post('/collections/items', validateItem, authMiddleware, itemController.createItem);
router.put('/collections/items/:itemId', authMiddleware, itemController.updateItem);
router.delete('/collections/items/:itemId', authMiddleware, itemController.deleteItem);
router.get('/collections/:collectionId/items', authMiddleware, itemController.getItemsInCollection); // get all items in col.

router.get('/collections/items/:itemId', authMiddleware, itemController.getItemById);
router.get('/items/latest', itemController.getItems);

export default router;
