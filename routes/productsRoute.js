import express from 'express';
const router = express.Router();

import {
	getAllProducts,
	getSingleProduct,
	updateProduct,
	addNewProduct,
	deleteProducts,
} from '../controllers/productsController.js';
import { auth } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/isAdmin.js';

// get request "/products/", "forward it to the productsRouter"
router.get('/', getAllProducts);
// post
router.post('/', auth, isAdmin, addNewProduct);
// get single product
router.get('/:id', getSingleProduct);
// patch /products/adshgfkajdhkjghk
router.patch('/:id', auth, isAdmin, updateProduct);
// delete /products/qeowruewlkfhasdh
router.delete('/:id', auth, isAdmin, deleteProducts);

export default router;
