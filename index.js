import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import regRoutes from './routes/regRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import collectionRoutes from './routes/collectionRoutes.js';
import itemRoutes from './routes/itemRouter.js';
import 'dotenv/config';


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

app.use('/api', collectionRoutes)
app.use('/api', itemRoutes)

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('App connected to db');
        app.use('/api', regRoutes)
        app.use(errorMiddleware);
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port ${process.env.PORT}`);
        });
    })
    .catch((eror) => {
        console.log(eror);
    });
