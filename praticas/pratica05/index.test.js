const supertest = require('supertest');

const app = require('./index');

const request = supertest(app);

describe('Teste API', function () {
    test('Deve retornar status 200 e um aquivo JSON no GET /products', async () => {
        const response = await request.get("/products");
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
    })

    test('Deve retornar status 200 e um aquivo JSON no GET /products/id', async () => {
        const response = await request.get("/products/1");
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
    })

    
    test('Deve retornar status 404 e um aquivo JSON no GET /products/id', async () => {
        const response = await request.get("/products/100");
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/json/);
    })

    test('Deve retornar status 404 e um aquivo JSON no GET /products/id', async () => {
        const response = await request.get("/products/100");
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/json/);
    })

    test('Deve retornar status 201 e um aquivo JSON no POST /products', async () => {
        const response = await request.post("/products").send({name: "Greap", price: 15.00});
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
    })

    test('Deve retornar status 422 e um aquivo JSON no POST /products', async () => {
        const response = await request.post("/products").send({});
        expect(response.status).toBe(422);
        expect(response.headers['content-type']).toMatch(/json/);
    })

    test('Deve retornar status 200 e um aquivo JSON no PUT /products/id', async () => {
        const response = await request.put("/products/1").send({name: "Grape", price: 15.00});
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
    })

    test('Deve retornar status 404 e um aquivo JSON no PUT /products/id', async () => {
        const response = await request.put("/products/100");
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/json/);
    })

    test('Deve retornar status 204 vazio no DELETE /products/id', async () => {
        const response = await request.delete("/products/1");
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    })

    test('Deve retornar status 404 e um JSON no DELETE /products/id', async () => {
        const response = await request.delete("/products/100");
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/json/);
    })
})