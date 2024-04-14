import AxiosAdapter from "../../src/infra/Http/AxiosAdapter";
import AuthorizationGatewayHttp from "../../src/infra/gateway/AuthorizationGateway";

test("Shold be teste a Service of Authorization", async () => {
  const authorizationGateway = new AuthorizationGatewayHttp(new AxiosAdapter());
  const output = await authorizationGateway.authorization();
  expect(output.status).toBe(200);
  expect(output.data.message).toBe("Autorizado");
});
