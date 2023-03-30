import OrderCollection from '../models/orderSchema.js';
import ProductCollection from '../models/productSchema.js';
import { stripe } from '../server.js';

export const getAllOrders = async (req, res) => {
	try {
		const orders = await OrderCollection.find()
			//.populate('userId', '-profileImage -password') // '-bla' => don't populate this properties
			.populate('userId', 'firstName')
			.populate('products', 'title price'); // => ref from the collection name given in the model
		res.json({ success: true, data: orders });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const openStripeChekoutPage = async (req, res) => {
	try {
		const data = [];
		for (const id of req.body.products) {
			data.push(await ProductCollection.findById(id));
		}

		const line_items = data.map((product) => {
			return {
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price_data: {
					currency: 'usd',
					product_data: {
						name: product.title,
						images: [product.thumbnail],
						description: product.description,
					},
					unit_amount: product.price * 100,
				},
				quantity: 1,
			};
		});
		const session = await stripe.checkout.sessions.create({
			line_items,
			mode: 'payment',
			success_url: `http://localhost:5173/cart?success=true`,
			cancel_url: `http://localhost:5173/cart?success=false`,
		});

		res.json({ success: true, url: session.url });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const addNewOrder = async (req, res, next) => {
	try {
		const order = new OrderCollection(req.body);
		await order.save();
		res.json({ success: true, data: order });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const getSingleOrder = async (req, res) => {
	try {
		const { id } = req.params;
		const order = await OrderCollection.findById(id);
		if (order) {
			res.json({ success: true, data: order });
		} else {
			res.json({ success: false, message: 'please provide valid id' });
		}
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const updateOrder = async (req, res) => {
	try {
		const { id } = req.params;
		const order = await OrderCollection.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json({ success: true, data: order });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const deleteOrder = async (req, res) => {
	try {
		const { id } = req.params;
		const order = await OrderCollection.findByIdAndRemove(id);
		res.json({ success: true, data: order });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const getAllUserOrders = async (req, res) => {
	try {
		const { id } = req.params;
		// get all orders belonging to thta specific user
		const userOrders = await OrderCollection.find({ userId: id }).populate(
			'products'
		); // convert id into products content
		res.json({ success: true, data: userOrders });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};
