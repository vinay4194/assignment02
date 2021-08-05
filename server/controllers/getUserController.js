import Input from "../models/input";

const getUserController = {
	async getUsers(req, res, next) {
		try {
			const inputs = await Input.find();
			if (inputs) {
				res.json(inputs);
			}
		} catch (error) {
			return next(error);
		}
	},
	async deleteUser(req, res, next) {
		try {
			await Input.findByIdAndRemove(req.params.id);

			res.json({ message: "success" });
		} catch (error) {
			return next(error);
		}
	},
};

export default getUserController;
