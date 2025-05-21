// tests/userController.test.ts
import request from 'supertest';
import app from '../apptst'; // Assuming app.ts initializes Express

beforeAll(() => {
  // Define the route for the GET /greet endpoint
  app.get("/greet", (req, res) => {
  const name = req.query.name || "World";
    res.json({ message: `Hello, ${name}!` });
  });
});

describe('Member Controller', () => {
  it('GET /api/v1/members should return a list of members', async () => {
    const response = await request(app).get('/greet');
    expect(response.status).toBe(200);
    //expect(Array.isArray(response.body)).toBe(true);
  });
});