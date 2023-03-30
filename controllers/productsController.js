import ProductCollection from '../models/productSchema.js';

export const getAllProducts = async (req, res) => {
	try {
		const products = await ProductCollection.find();
		res.json({ success: true, data: products });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const addNewProduct = async (req, res) => {
	try {
		const product = new ProductCollection(req.body);
		await product.save();
		res.json({ success: true, data: product });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const getSingleProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await ProductCollection.findById(id);
		if (product) {
			res.json({ success: true, data: product });
		} else {
			res.json({ success: false, message: 'please provide valid id' });
		}
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await ProductCollection.findByIdAndUpdate(
			id,
			req.body,
			{ new: true }
		);
		res.json({ success: true, data: product });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const deleteProducts = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await ProductCollection.findByIdAndRemove(id);
		res.json({ success: true, data: product });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};
