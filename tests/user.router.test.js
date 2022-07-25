require('dotenv').config();
const { app } = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);

const tokens = {
  superToken: '',
  normalToken: '',
};

describe('Users', () => {
  beforeAll(async () => {
    const [superToken, normalToken] = await Promise.all([
      request.post('/api/v1/auth/login').send({
        email: process.env.TEST_USER_EMAIL,
        password: process.env.TEST_USER_PASSWORD,
      }),
      request.post('/api/v1/auth/login').send({
        email: process.env.TEST_NORMAL_USER_EMAIL,
        password: process.env.TEST_NORMAL_USER_PASSWORD,
      }),
    ]);

    tokens.superToken = superToken.body.body.token;
    tokens.normalToken = normalToken.body.body.token;
  });

  describe('GET /api/v1/users', () => {
    it('should return an error if you do not pass it an authorization token', async () => {
      const response = await request.get('/api/v1/users');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('No token provided');
    });

    it('should return an error if you pass it an invalid authorization token', async () => {
      const response = await request
        .get('/api/v1/users')
        .set('x-auth-token', tokens.normalToken);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        'You are not authorized to access this resource'
      );
    });

    it('should return an array if you pass it a valid authorization token', async () => {
      const response = await request
        .get('/api/v1/users')
        .set('x-auth-token', tokens.superToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Users retrieved successfully');
      expect(response.body.body).toBeInstanceOf(Array);
    });

    it('should return an array of users if you pass it a valid authorization token', async () => {
      const response = await request
        .get('/api/v1/users')
        .set('x-auth-token', tokens.superToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Users retrieved successfully');
      expect(response.body.body).toBeInstanceOf(Array);
      expect(response.body.body[0].name).toBe('Andres Argote');
    });
  });

  describe('PATCH /api/v1/users/:id/role', () => {
    it('should return an error if you do not pass it an authorization token', async () => {
      const response = await request
        .patch(`/api/v1/users/${process.env.TEST_NORMAL_USER_ID}/role`)
        .send({ role: 'admin' });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('No token provided');
    });

    it('should return an error if you pass it an invalid authorization token', async () => {
      const response = await request
        .patch(`/api/v1/users/${process.env.TEST_NORMAL_USER_ID}/role`)
        .set('x-auth-token', tokens.normalToken)
        .send({ role: 'admin' });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        'You are not authorized to access this resource'
      );
    });

    it('should return an error if you do not pass a valid id param', async () => {
      const response = await request
        .patch('/api/v1/users/12331223/role')
        .set('x-auth-token', tokens.superToken);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        '"id" with value "12331223" fails to match the valid mongo id pattern'
      );
    });

    it('should update the role of a user if you pass it a valid authorization token', async () => {
      const response = await request
        .patch(`/api/v1/users/${process.env.TEST_NORMAL_USER_ID}/role`)
        .set('x-auth-token', tokens.superToken)
        .send({ role: 'seller' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User role updated successfully');
      expect(response.body.body.role).toBe('seller');
    });
  });

  describe('PATCH /api/v1/users/:id/delete', () => {
    it('should return an error if you do not pass it an authorization token', async () => {
      const response = await request
        .patch(`/api/v1/users/${process.env.TEST_NORMAL_USER_ID}/delete`)
        .send({ role: 'admin' });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('No token provided');
    });

    it('should return an error if you pass it an invalid authorization token', async () => {
      const response = await request
        .patch(`/api/v1/users/${process.env.TEST_NORMAL_USER_ID}/delete`)
        .set('x-auth-token', tokens.normalToken)
        .send({ role: 'admin' });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        'You are not authorized to access this resource'
      );
    });

    it('should return an error if you do not pass a valid id param', async () => {
      const response = await request
        .patch('/api/v1/users/12331223/delete')
        .set('x-auth-token', tokens.superToken);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        '"id" with value "12331223" fails to match the valid mongo id pattern'
      );
    });

    it('should delete a user if you pass it a valid authorization token', async () => {
      const response = await request
        .patch(`/api/v1/users/${process.env.TEST_NORMAL_USER_ID}/delete`)
        .set('x-auth-token', tokens.superToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User deleted successfully');
      expect(response.body.body.isActive).toBe(false);
    });
  });

  describe('POST /api/v1/users/register', () => {
    it('should return an error if you do not pass it an authorization token', async () => {
      const response = await request.post(`/api/v1/users/register`);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('No token provided');
    });

    it('should return an error if you pass it an invalid authorization token', async () => {
      const response = await request
        .post('/api/v1/users/register')
        .set('x-auth-token', tokens.normalToken);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        'You are not authorized to access this resource'
      );
    });

    it('should return an error if you do not pass a valid user', async () => {
      const response = await request
        .post('/api/v1/users/register')
        .set('x-auth-token', tokens.superToken);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        '"email" is required. "password" is required. "name" is required. "phoneNumber" is required'
      );
    });

    it('should return a user if you pass a valid user', async () => {
      const response = await request
        .post('/api/v1/users/register')
        .set('x-auth-token', tokens.superToken)
        .send({
          name: 'Test',
          email: 'test@gmail.com',
          phoneNumber: '0424436089',
          password: 'test123678',
        })
        .expect(201);
      expect(response.body.message).toBe('User created successfully');
      expect(response.body.body.name).toBe('Test');
    });
  });
});
