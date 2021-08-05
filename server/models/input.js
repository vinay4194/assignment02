import mongoose from "mongoose";
const Schema = mongoose.Schema;

const inputSchema = new Schema({
	username: { type: String, required: true },
	mobileNo: { type: Number, required: true },
	email: { type: String, required: true },
	address: { type: String, required: true },
});
export default mongoose.model("Input", inputSchema, "inputs");
