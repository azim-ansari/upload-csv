const mongoose = require("mongoose")
require('dotenv').config()
const mongoInit = async () => {
	try {
		await mongoose.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to Database yeah !! ✌️");
	} catch (e) {
		console.log(e.message);
	}
};

module.exports = mongoInit;