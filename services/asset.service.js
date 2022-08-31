const { config } = require("../config");
const assetModel = require("../database/models/asset.model");

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	accessKeyId: config.S3_ACCESS_KEY_ID,
	secretAccessKey: config.S3_SECRET_ACCESS_KEY,
	region: config.S3_REGION,
});

class AssetService {
	async getAllAssets() {
		const assets = await assetModel.find({ isActive: true });

		return assets;
	}

	async uploadAsset({ userId, asset, fileExtension }) {
		const assetName = `${Date.now() + "." + fileExtension}`;

		await s3
			.putObject({
				Body: asset,
				Bucket: config.S3_BUCKET_NAME,
				Key: assetName,
			})
			.promise();

		const assetURL = `https://${config.S3_BUCKET_NAME}.s3.amazonaws.com/${assetName}`;

		const newAsset = await assetModel.create({
			owner: userId,
			originalUrl: assetURL,
		});

		return newAsset;
	}

	async deleteAsset(id) {
		const asset = await assetModel.findById(id);

		if (!asset) {
			throw new Error("Asset not found");
		}

		await s3
			.deleteObject({
				Bucket: config.S3_BUCKET_NAME,
				Key: asset.originalUrl.split("/").pop(),
			})
			.promise();

		await assetModel.findByIdAndDelete(id);
	}
}

module.exports = AssetService;
