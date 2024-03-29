const config = {
	env: process.env.NODE_ENV || "development",
	mongodbUri:
	process.env.NODE_ENV === "test"
		? process.env.MONGO_TEST
		: process.env.MONGO,
	port: process.env.PORT || "4000",
	SECRET_KEY: process.env.SECRET_KEY,
	REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
	RECOVERY_SECRET_KEY: process.env.RECOVERY_SECRET_KEY,
	JWT_EXPIRATION: process.env.JWT_EXPIRATION,
	JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
	JWT_RECOVERY_EXPIRATION: process.env.JWT_RECOVERY_EXPIRATION,
	EMAIL: process.env.EMAIL,
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
	EMAIL_HOST: process.env.EMAIL_HOST,
	EMAIL_PORT: process.env.EMAIL_PORT,
	FRONTEND_URL: process.env.FRONTEND_URL,
	S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
	S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
	S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
	S3_REGION: process.env.S3_REGION,
};

module.exports = { config };
