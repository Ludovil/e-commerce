import jwt from 'jsonwebtoken';
import UserCollection from '../models/userSchema.js';

export const auth = async (req, res, next) => {
	try {
		const token = req.headers.token;
		// verify token
		const payload = jwt.verify(token, process.env.SIGNATURE); // returns payload / see userController line 88
		//if (payload) {
		const user = await UserCollection.findById(payload._id);
		req.user = user; // this property is created
		next();
		//} else {}
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};
