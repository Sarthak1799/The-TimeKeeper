const config = require("./utils/config");
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const path = require("path");
const timezoneRouter = require("./controllers/timezones");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

app.use(express.static(path.resolve(__dirname, "../client/build")));

logger.info("connecting to MONGODB");

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error("error connection to MongoDB:", error.message);
	});

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/users", timezoneRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT || 3001, () => {
	logger.info(`Server running on port ${config.PORT}`);
});