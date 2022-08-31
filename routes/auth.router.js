const express = require("express");
const boom = require("@hapi/boom");

const authService = require("../services/auth.service");
const validatorHandler = require("../middlewares/validator.handler");

const {
	loginUserSchema,
	recoverySchema,
	changePasswordSchema,
} = require("../schemas/auth.schema");
const { checkJWT } = require("../middlewares/auth.handler");

const router = express.Router();
const service = new authService();

router.get("/me", checkJWT, async (req, res, next) => {
	try {
		const user = await service.getUser(req.user.uid);
		res.status(200).json({ message: "success", body: user });
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.post(
	"/login",
	validatorHandler(loginUserSchema, "body"),
	async (req, res, next) => {
		try {
			const body = req.body;
			const token = await service.loginUser(body);

			res.json({
				body: token,
				message: "Login successful",
				statusCode: 200,
			});
		} catch (err) {
			next(err);
		}
	}
);

router.get("/refresh-token", async (req, res, next) => {
	try {
		const refreshToken = req.headers["x-auth-refresh-token"];

		if (!refreshToken) {
			throw boom.unauthorized("No refresh token provided");
		}

		const accessToken = await service.refreshToken(refreshToken);

		res.json({
			body: accessToken,
			message: "Access token refreshed successfully",
			statusCode: 200,
		});
	} catch (err) {
		next(err);
	}
});

router.post(
	"/recovery",
	validatorHandler(recoverySchema, "body"),
	async (req, res, next) => {
		try {
			const { email } = req.body;
			const response = await service.recovery(email);

			res.json({
				body: {},
				message: response,
				statusCode: 200,
			});
		} catch (err) {
			next(err);
		}
	}
);

router.put(
	"/change-password",
	validatorHandler(changePasswordSchema, "body"),
	async (req, res, next) => {
		try {
			const { token, password } = req.body;
			const { message } = await service.changePassword(token, password);

			res.json({
				body: {},
				message: message,
				statusCode: 200,
			});
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
