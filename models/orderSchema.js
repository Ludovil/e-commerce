import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		products: [{ type: Schema.Types.ObjectId, ref: 'products' }],
	},
	{ timestamps: true } // add 2 properties at the end of the object: - createdAt - updatedAt // no need to add them manually
);

const OrderCollection = model('orders', orderSchema);
export default OrderCollection;
