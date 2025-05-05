const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const connectToMongo = require('../db');
const Task = require('../models/Task');

beforeAll(async () => {
  await connectToMongo();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('MongoDB Connection', () => {
  test('should be connected to the database', () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });
});

describe('Todo API Endpoints', () => {
  test('GET /tasks should return an array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tasks should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ description: 'Test task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.description).toBe('Test task');
    expect(res.body.isCompleted).toBe(false);
  });

  test('PATCH /tasks/:id should mark task as completed', async () => {
    const task = await Task.create({ description: 'Mark complete' });
    const res = await request(app)
      .patch(`/tasks/${task._id}`)
      .send({ isCompleted: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.isCompleted).toBe(true);
  });

  test('DELETE /tasks/:id should delete a task', async () => {
    const task = await Task.create({ description: 'To delete' });
  
    console.log('Created Task ID:', task._id);
  
    const res = await request(app).delete(`/tasks/${task._id}`);
    console.log('Delete Response:', res.statusCode, res.body);
  
    expect(res.statusCode).toBe(200);
  
    const deleted = await Task.findById(task._id);
    console.log('Deleted FindById Result:', deleted);
  
    expect(deleted).toBeNull();
  });
});
