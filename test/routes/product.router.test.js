const mongoose = require("mongoose");
const supertest = require("supertest");

const { app, server } = require("../..");
const Product = require("../../database/models/product.model");
const { validProducts, invalidProducts } = require("./productObjects.test");

const request = supertest(app);

beforeEach(async () => {
  await Product.deleteMany({});
  const product = new Product(validProducts[0]);
  await product.save();
});

describe("Testing products CRUD routes", () => {
  const baseURL = "/api/v1/products";

  describe("GET /api/v1/products", () => {
    test("test response with json and status code 200", async () => {
      await request
        .get(baseURL)
        .expect("Content-Type", /application\/json/)
        .expect(200);
    });

    test("test response content", async () => {
      const response = await request.get(baseURL);
      expect(response.body.body).toHaveLength(1);
    });
  });

  describe("POST /api/v1/products/create", () => {
    test("test response with correct body", async () => {
      await request
        .post(`${baseURL}/create`)
        .send(validProducts[1])
        .set("Accept", "application/json")
        .expect("Content-Type", /application\/json/)
        .expect(201);

      const response = await request.get(baseURL);
      expect(response.body.body).toHaveLength(2);
    });

    test("test response with incorrect body", async () => {
      for(let product of invalidProducts){
        await request.post(`${baseURL}/create`)
          .send(product)
          .set('Accept', "application/json")
          .expect("Content-Type", /application\/json/)
          .expect(400)
      }
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
