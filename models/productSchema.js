import { Schema, model } from 'mongoose';

const productSchema = new Schema({
	title: {
		type: String,
		requiered: true,
	},
	description: {
		type: String,
		requiered: true,
	},
	price: {
		type: Number,
		requiered: true,
	},
	rating: {
		type: Number,
		requiered: true,
	},
	brand: {
		type: String,
		requiered: true,
	},
	category: {
		type: String,
		requiered: true,
	},
	thumbnail: {
		type: String,
		requiered: true,
	},
	images: [],
	// images: {
	// 	type: Array,
	// 	requiered: false,
	// },
});

const ProductCollection = model('products', productSchema);

export default ProductCollection;
