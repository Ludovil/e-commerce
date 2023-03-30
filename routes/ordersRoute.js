import express from 'express';
const router = express.Router();
import {
	addNewOrder,
	deleteOrder,
	getAllOrders,
	getSingleOrder,
	updateOrder,
	openStripeChekoutPage,
	getAllUserOrders,
} from '../controllers/ordersController.js';
import { auth } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/isAdmin.js';

// get request "/users/", "forward it to the productsRouter"
router.get('/', auth, isAdmin, getAllOrders);
// post request "/orders/" redirecting user to stripe checkout page
router.post('/', auth, openStripeChekoutPage);

// post request "/orders/confirm /" add new order
router.post('/confirm', auth, addNewOrder);

// get all user orders
router.get('/userorders/:id', auth, isAdmin, getAllUserOrders);

// get single user
router.get('/:id', auth, isAdmin, getSingleOrder);
// patch /users/adshgfkajdhkjghk
router.patch('/:id', auth, isAdmin, updateOrder);
// delete /users/qeowruewlkfhasdh
router.delete('/:id', auth, isAdmin, deleteOrder);

export default router;
