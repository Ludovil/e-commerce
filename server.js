import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import fileupload from 'express-fileupload';
import cors from 'cors';

import productsRoute from './routes/productsRoute.js';
import usersRoute from './routes/usersRoute.js';
import ordersRoute from './routes/ordersRoute.js';

// image profile
import ImageCollection from './models/imagesSchema.js';
import stream from 'stream';
import Stripe from 'stripe';
export const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 4000;

// connect DB
mongoose
	.connect(process.env.URI)
	.then(() => console.log('connected to DB'))
	.catch((err) => console.log(err.message));

//handling cors
// 1st method
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
// 	next();
// });

//2nd method
//app.use(cors({ origin: 'http://localhost:5173', exposedHeaders: ['token'] })); // expose hedaer only to this origin

// Middlewares
// parsing json data
app.use(express.json());
// form www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));
// form - handling / parsing form data multer or express-fileupload (better the 2nd one)
app.use(fileupload());

// serves static files
app.use(express.static('views/dist'));

// Routes
app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/orders', ordersRoute);

// image profile
app.get('/images/:filename', async (req, res) => {
	const image = await ImageCollection.findOne({
		filename: req.params.filename,
	});
	const readStream = stream.Readable.from(image.data); // read the buffer data using stream
	readStream.pipe(res);
});

// server running
app.listen(PORT, () => console.log('server is running on PORT', PORT));
