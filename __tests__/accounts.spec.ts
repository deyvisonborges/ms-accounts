import SuperTest from "supertest";
import App from "../src/app";
import { endpoints } from "../src/routes/endpoints";

describe("Testando Rotas de Accounts", () => {
  it("GET /accounts/ - Deve retornar status code 200", async () => {
    const res = await SuperTest(App).get(endpoints.base);
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("POST /accounts/ - Deve retornar status code 201", async () => {
    let payload = {
      id: 1,
      name: "dev",
      email: "dev-test@gmail.com",
      password: "dev",
      status: 2,
    };
    const res = await SuperTest(App).post(endpoints.base).send(payload);
    expect(res.status).toEqual(201);
    expect(res.body.id).toBe(1);
  });

  it("POST /accounts/ - Deve retornar o JSON do novo usuario", async () => {
    let payload = {
      id: 1,
      name: "dev",
      email: "dev-test@gmail.com",
      password: "dev",
      status: 2,
    };
    const res = await SuperTest(App).post(endpoints.base).send(payload);
    expect(res.body).toEqual(payload);
    expect(res.body.id).toBe(1);
  });

  it("POST /accounts/ - Deve retornar o status code 400 caso o payload seja diferente do esperado", async () => {
    let payload = {
      id: 1,
      street: "Rua das Margaridas, S/N",
      email: "dev-test@gmail.com",
      password: "dev",
      status: 2,
    };
    const res = await SuperTest(App).post(endpoints.base).send(payload);
    expect(res.body).toEqual(payload);
    expect(res.body.id).toBe(1);
  });

  it("GET /accounts/:id - Deve retornar status code 200", async () => {
    const res = await SuperTest(App).get(`${endpoints.base}/1`);
    expect(res.status).toEqual(200);
    expect(res.body.id).toBe(1);
  });

  it("GET /accounts/:id - Deve retornar status code 404 se não existir account", async () => {
    const res = await SuperTest(App).get(`${endpoints.base}/2`);
    expect(res.status).toEqual(404);
  });

  it("GET /accounts/:id - Deve retornar status code 400 se o ID for de um tipo diferente do definido", async () => {
    const res = await SuperTest(App).get("/accounts/abc");
    expect(res.status).toEqual(400);
  });
});
