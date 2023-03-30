import { body, validationResult } from 'express-validator';

export const rules = [
	body('email')
		.isEmail()
		.withMessage('please provide a valid email')
		.normalizeEmail(),
	body('password')
		.isString()
		.isLength({ min: 4 })
		.withMessage('password is too short'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			next();
		} else {
			res.json({
				success: false,
				message: errors
					.array()
					.map((err) => ({ [err.param]: err.msg })),
			});
		}
	},
];
