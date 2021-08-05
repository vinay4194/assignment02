import Joi from "joi";
import Input from "../models/input";

const addUserController = {
	async add(req, res, next) {
		//validation using Joi
		const addUserSchema = Joi.object({
			username: Joi.string().alphanum().min(3).max(30).required(),
			mobileNo: Joi.string()
				.length(10)
				.pattern(/^[0-9]+$/)
				.required(),

			email: Joi.string().email().required(),
			address: Joi.string().required(),
		});
		const { error } = addUserSchema.validate(req.body);
		if (error) {
			return next(error);
		}
		const { username, mobileNo, email, address } = req.body;
		const input = new Input({
			username,
			mobileNo,
			email,
			address,
		});
		let result;
		try {
			result = await input.save();
			if (result) {
				res.json({ message: "success" });
			}
		} catch (err) {
			return next(err);
		}
	},
};

export default addUserController;
