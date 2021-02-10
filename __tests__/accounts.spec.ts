import SuperTest from "supertest";
import App from "../src/app";
import { endpoints } from "../src/routes/endpoints";

const payload = {
  id: 1,
  name: "dev",
  email: "dev-test@gmail.com",
  password: "dev",
  status: 2,
};

describe("Testando Rotas de Accounts", () => {
  it("POST /accounts/ - Deve retornar status code 201", async () => {
    const result = await SuperTest(App).post(endpoints.base).send(payload);
    expect(result.status).toEqual(201);
  });

  it("POST /accounts/ - Deve retornar o JSON do novo usuario", async () => {
    const result = await SuperTest(App).post(endpoints.base).send(payload);
    expect(result.body).toEqual(payload);
  });
});
