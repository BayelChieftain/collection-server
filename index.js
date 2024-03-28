import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import errorMiddleware from './middlewares/errorMiddleware.js';
import 'dotenv/config';
import { body } from 'express-validator';
import authMiddleware from "./middlewares/authMiddleware.js";
import upload from './middlewares/multerFile.js';
import roleFromDbMiddleware from './middlewares/roleFromDbMiddleware.js';
import roleMiddleware from './middlewares/roleMiddleware.js'
import { collectionController } from "./controllers/collectionController.js";
import { itemController } from "./controllers/itemController.js";
import { userController } from "./controllers/userController.js";
const validateItem = [
    body('name').notEmpty().withMessage('Name is required'),
    body('collectionRef').notEmpty().withMessage('Collection reference is required').isLength({ min: 24, max: 24 }).withMessage('Invalid collection reference'),
    body('dynamicFields').notEmpty()
];


const validateCollection = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required').isIn(['Books', 'Signs', 'Silverware', 'Paintings']).withMessage('Invalid category'),
    body('fields').notEmpty(),
    body('owner').notEmpty().withMessage('Owner is required').isLength({ min: 24 }).withMessage('Invalid input')
];


const app = express();
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://660596f1dc0d7831075f71ed--magnificent-zabaione-fb869f.netlify.app',
    credentials: true,
}));

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    console.log(req);

    return res.status(234).send("WELCOME");
});



app.post('/api/collections', validateCollection, authMiddleware, collectionController.createCollection);
app.get('/api/collections/:collectionId', authMiddleware, collectionController.getCollectionById);
app.put('/api/collections/:collectionId', authMiddleware, collectionController.updateCollection);
app.delete('/api/collections/:collectionId', authMiddleware, collectionController.deleteCollection);
app.get('/api/collections/largest', collectionController.getCollections);
app.get('/api/collections/my/:userId', authMiddleware, collectionController.getCollectionByOwner);
app.post('/api/upload', authMiddleware, upload.single('imageUrl'), collectionController.uploadImage);

app.post('/api/registration', [body('email').isEmail(), body('password').isLength({ min: 1, max: 150 })], userController.registration);
app.post('/api/login', userController.login);
app.post('/api/logout', userController.logout);
app.get('/api/refresh', userController.refresh);
app.get('/api/users', authMiddleware, roleFromDbMiddleware, roleMiddleware('admin'), userController.getUsers);
app.post('/api/updateUserRole', authMiddleware, roleFromDbMiddleware, roleMiddleware('admin'), userController.updateUserRole);
app.delete('/api/deleteUser/:userId', authMiddleware, roleFromDbMiddleware, roleMiddleware('admin'), userController.deleteUser);
app.post('/api/collections/items', validateItem, authMiddleware, itemController.createItem);
app.put('/api/collections/items/:itemId', authMiddleware, itemController.updateItem);
app.delete('/api/collections/items/:itemId', authMiddleware, itemController.deleteItem);
app.get('/api/collections/:collectionId/items', authMiddleware, itemController.getItemsInCollection);
app.get('/api/collections/items/:itemId', authMiddleware, itemController.getItemById);
app.get('/api/items/latest', itemController.getItems);

// Подключение middleware для обработки ошибок
app.use(errorMiddleware);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('App connected to db');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port ${process.env.PORT}`);
        });
    })
    .catch((eror) => {
        console.log(eror);
    });
