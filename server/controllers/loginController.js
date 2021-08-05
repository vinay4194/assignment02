import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";
import User from "../models/user";

const loginController = {
	async login(req, res, next) {
		//Validate
		const loginSchema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});
		const { error } = loginSchema.validate(req.body);
		if (error) {
			return next(error);
		}

		let access_token;
		try {
			const user = await User.findOne({ email: req.body.email });

			if (!user) {
				return next(CustomErrorHandler.invalidCredentials());
			}

			if (req.body.password === user.password) {
				access_token = JwtService.sign({ _id: user._id });
				res.json({ access_token: access_token, message: "success" });
			} else {
				return next(CustomErrorHandler.invalidCredentials());
			}
		} catch (err) {
			return next(err);
		}
	},
};

export default loginController;
