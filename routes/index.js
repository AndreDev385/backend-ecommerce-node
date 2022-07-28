const express = require("express");

const productRouter = require("./product.router");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const brandRouter = require("./brand.router");
const assetRouter = require("./asset.router");
const categoryRouter = require("./category.router");
const variationRouter = require("./variation.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/users", userRouter);
  router.use("/products", productRouter);
  router.use("/brands", brandRouter);
  router.use("/assets", assetRouter);
  router.use("/categories", categoryRouter);
  router.use("/variations", variationRouter);
}

module.exports = routerApi;
