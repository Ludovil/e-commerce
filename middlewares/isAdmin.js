export const isAdmin = async (req, res, next) => {
	if (
		req.user.role === 'admin' ||
		req.params?.id === req.user._id.toString()
	) {
		next();
	} else res.json({ success: false, msg: 'access denied' });
};
