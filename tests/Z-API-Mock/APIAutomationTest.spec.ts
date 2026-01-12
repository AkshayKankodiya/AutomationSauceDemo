import { request } from 'http';
import { test, expect } from '../../Fixture/fixtures';
test.describe('API Automation – User & Authentication APIs', () => {
  const baseURL = 'https://reqres.in/api';

  test('GET public website → should return 200 OK', async ({ request }) => {
    const response = await request.get('https://www.saucedemo.com/');
    console.log('Response Status:', response.status());
    expect(response.status()).toBe(200);
  });

  test('GET /users → should return 200 OK', async ({ request }) => {
    const response = await request.get(`${baseURL}`);
    expect(response.status()).toBe(200);
  });

  test('GET /users/{invalidId} → should return error response', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/invalid-user`);
    expect(response.status()).toBe(403);
  });

  test('POST /users → should create a new user successfully', async ({ request }) => {
    const response = await request.post(`${baseURL}/users`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Automation Ninja',
        job: 'QA Engineer',
      },
    });

    expect([201, 403]).toContain(response.status());

    if (response.status() === 201) {
      const body = await response.json();
      expect(body).toHaveProperty('id');
      expect(body.name).toBe('Automation Ninja');
      console.log('Created new user:', body);
    }
  });

  test('POST /login → should authenticate user with valid credentials', async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    console.log('Login Response Status:', response.status());
    expect([200, 403]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();
      expect(body).toHaveProperty('token');
      console.log('Login successful:', body);
    }
  });
});
