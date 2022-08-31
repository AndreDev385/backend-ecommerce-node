const express = require("express");

const assetService = require("../services/asset.service");
const { checkJWT, isRole } = require("../middlewares/auth.handler");
const { isImage } = require("../middlewares/image.handler");
const validatorHandler = require("../middlewares/validator.handler");
const { idAssetSchema } = require("../schemas/asset.schema");

const router = express.Router();
const service = new assetService();

router.get("/", async (req, res, next) => {
	try {
		const images = await service.getAllAssets();

		res.json({
			body: images,
			message: "Images retrieved successfully",
			statusCode: 200,
		});
	} catch (err) {
		next(err);
	}
});

router.post("/", checkJWT, isRole("admin", "seller"), isImage, async (req, res, next) => {
	try {
		const userId = req.user.uid;
		const asset = req.body;
		const fileExtension = req.fileExtension;

		const newAsset = await service.uploadAsset({ userId, asset, fileExtension });

		res.json({
			body: newAsset,
			message: "Image uploaded successfully",
			statusCode: 200,
		});
	} catch (err) {
		next(err);
	}
});

router.delete(
	"/:id",
	checkJWT,
	isRole("admin", "seller"),
	validatorHandler(idAssetSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			await service.deleteAsset(id);

			res.json({
				body: {},
				message: "Image deleted successfully",
				statusCode: 200,
			});
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
