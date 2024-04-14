import AxiosAdapter from "../../src/infra/Http/AxiosAdapter";
import AuthorizationGatewayHttp from "../../src/infra/gateway/AuthorizationGateway";

test("Shold be teste a Service of Authorization", async () => {
  const authorizationGateway = new AuthorizationGatewayHttp(new AxiosAdapter());
  const output = await authorizationGateway.authorization();
  console.log(output);
  expect(output.message).toBe("Autorizado");
});
