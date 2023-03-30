// This is your test secret API key.
const stripe = require('stripe')(
	'sk_test_51MquJSG6p4DXFhR4SyDdFHlRcVT3Q37kOxBnKSOuIOMiSLnI8IVopwd43uOYAfmTELpShy4qIdCIfjHoIgkeksDH008DUtScNm'
);
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/orders', async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price: '{{PRICE_ID}}',
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: `${YOUR_DOMAIN}?success=true`,
		cancel_url: `${YOUR_DOMAIN}?canceled=true`,
	});

	res.json({ url: session.url });
});

app.listen(4242, () => console.log('Running on port 4242'));
