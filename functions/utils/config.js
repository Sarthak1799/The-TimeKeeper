require("dotenv").config();

const PORT = 3001;
const MONGODB_URI =
	"mongodb+srv://TimeKeeper17:timekeeper17@cluster0.5gpgu.mongodb.net/TimeKeeperDB?retryWrites=true&w=majority";
const JWT_KEY = "this-is-the-secret-key-ma-man";

module.exports = {
	MONGODB_URI,
	PORT,
	JWT_KEY
};
