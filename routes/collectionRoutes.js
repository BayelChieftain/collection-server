import express from 'express';
import { collectionController } from '../controllers/collectionController.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerFile.js';

const router = express.Router();

const validateCollection = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required').isIn(['Books', 'Signs', 'Silverware', 'Paintings']).withMessage('Invalid category'),
    body('fields').notEmpty(),
    body('owner').notEmpty().withMessage('Owner is required').isLength({ min: 24 }).withMessage('Invalid input')
];

router.post('/collections', validateCollection, authMiddleware, collectionController.createCollection);
router.get('/collections/:collectionId', authMiddleware, collectionController.getCollectionById);
router.put('/collections/:collectionId', authMiddleware, collectionController.updateCollection);
router.delete('/collections/:collectionId', authMiddleware, collectionController.deleteCollection);

router.get('/collections/largest', collectionController.getCollections);
router.get('/collections/my/:userId', authMiddleware, collectionController.getCollectionByOwner);

router.post('/upload', authMiddleware, upload.single('imageUrl'), collectionController.uploadImage)
export default router;