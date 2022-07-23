require('dotenv').config();
const { app } = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Auth', () => {
  describe('POST /api/v1/auth/login', () => {
    it('should return an error if you dont pass a valid login schema', async () => {
      const response = await request.post('/api/v1/auth/login');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"email" is required. "password" is required');
    });

    it('should return an error if you dont pass a valid email', async () => {
      const response = await request
        .post('/api/v1/auth/login')
        .send({ email: 'andre1234', password: '12345678' });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"email" must be a valid email');
    });

    it('should return an error if you dont pass a valid password', async () => {
      const response = await request
        .post('/api/v1/auth/login')
        .send({ email: 'andre1234@gmail.com', password: '123456' });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        '"password" length must be at least 8 characters long'
      );
    });

    it('should return an error if the user is inactive', async () => {
      const response = await request.post('/api/v1/auth/login').send({
        email: process.env.TEST_IS_ACTIVE_USER_EMAIL,
        password: process.env.TEST_IS_ACTIVE_USER_PASSWORD,
      });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });

    it('should return a user if you pass a valid login', async () => {
      const response = await request.post('/api/v1/auth/login').send({
        email: process.env.TEST_USER_EMAIL,
        password: process.env.TEST_USER_PASSWORD,
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.body).toHaveProperty('token');
      expect(response.body.body).toHaveProperty('refreshToken');
    });
  });
});
