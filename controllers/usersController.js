import UserCollection from '../models/userSchema.js';
import ImageCollection from '../models/imagesSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
	try {
		const users = await UserCollection.find();
		res.json({ success: true, data: users });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const addNewUser = async (req, res) => {
	try {
		const user = new UserCollection(req.body);
		if (req.files) {
			const image = new ImageCollection({
				filename: new Date().getTime() + '_' + req.files.image.name,
				// Date & Time, c'est pour donner un nom unique /
				//'image' est le nom du champ que l'a décidé pour la request
				data: req.files.image.data,
				userId: user._id,
			});
			await image.save();
			user.profileImage = `https://e-commerce-dci.onrender.com/#/images/${image.filename}`;
		}
		// hashing user password
		const hashedPassword = bcrypt.hashSync(user.password, 10);
		user.password = hashedPassword;
		//storing user in DB
		await user.save();
		res.json({ success: true, data: user });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const getSingleUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await UserCollection.findById(id);
		if (user) {
			res.json({ success: true, data: user });
		} else {
			res.json({ success: false, message: 'please provide valid id' });
		}
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await UserCollection.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json({ success: true, data: user });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await UserCollection.findByIdAndRemove(id);
		res.json({ success: true, data: user });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		// verifying email
		const user = await UserCollection.findOne({ email });
		// if email exist verifying password
		if (user) {
			// password
			const verifyPassword = bcrypt.compareSync(password, user.password);
			if (verifyPassword) {
				// create the token w/ jsonwebtoken
				const token = jwt.sign(
					{ _id: user._id, email: user.email }, // this is the payload
					process.env.SIGNATURE,
					{
						expiresIn: '1h', // token expires after 1h
						issuer: 'ludo', // who issued the token
						audience: 'e-store-user', // for whom
						// all this stuff is optional
					}
				);
				res.header('token', token).json({ success: true, data: user });
			} else {
				res.json({ success: false, message: 'wrong password' });
			}
		} else {
			res.json({ success: false, message: 'email does not exsit' });
		}
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const verify = (req, res, next) => {
	res.json({ success: true, data: req.user }); // the req.user in auth.js
};
