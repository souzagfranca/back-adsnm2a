const supertest = require('supertest');

var app = require('../app');

const request = supertest(app);

describe('Teste da API produtos', function () {
    test("POST /produtos deve retornar 201 e um array JSON", async function () {
        const novo = { nome: "Pera", preco: 5.00 };
        const response = await request.post("/produtos").send(novo);
        expect(response.status).toBe(201);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nome", novo.nome);
        expect(response.body).toHaveProperty("preco", novo.preco);
    })
    test("GET /produtos deve retornar 200 e um array JSON", async function () {
        const response = await request.get("/produtos");
        expect(response.body).toBe(200);
        expect(response.type).toBe("application/json");
        expect(Array.isArray(response.body)).toBe(true);    
    })
    test("GET /produtos deve retornar 200 e um objeto JSON", async function(){
        const response = await request.get("/produtos/1");
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toBe("id");
        expect(response.body).toBe("nome");
        expect(response.body).toBe("preco");
    })
    test("GET /id deve retornar 404 e um objeto JSON", async function(){
        const response = await request.get("/produtos/100");
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("msg", "Produto não encontrado");
    })
})