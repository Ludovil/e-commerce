import express from 'express';
import { rules } from '../middlewares/validators.js';
const router = express.Router();

import {
	getAllUsers,
	getSingleUser,
	addNewUser,
	updateUser,
	deleteUser,
	loginUser,
	verify,
} from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/isAdmin.js';

// get request "/users/", "forward it to the productsRouter"
router.get('/', auth, isAdmin, getAllUsers);
// post add new user // register
router.post('/', rules, addNewUser);
// login post request
router.post('/login', loginUser);

//verify token - keep user logged in - this route has to be above the three following others
router.get('/verify', auth, verify);
// get single user
router.get('/:id', auth, isAdmin, getSingleUser);
// patch /users/adshgfkajdhkjghk
router.patch('/:id', auth, isAdmin, updateUser);
// delete /users/qeowruewlkfhasdh
router.delete('/:id', auth, isAdmin, deleteUser);

export default router;
