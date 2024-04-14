import CreateTrasactionUseCase from "../../src/application/CreateTransaction";
import AutenticatosAuthorizationDecorator from "../../src/application/decorator/AutenticatorAuthorization/AutenticatorAuthorization";
import MysqlAdapter from "../../src/infra/DataBase/MysqlAdapter";
import AxiosAdapter from "../../src/infra/Http/AxiosAdapter";
import TransactionRepositoryMysql from "../../src/infra/Repository/TransactinRepositoryMysql";
import UserRepositoryMysql from "../../src/infra/Repository/UserRepositoryMysql";
import AuthorizationGatewayHttp from "../../src/infra/gateway/AuthorizationGateway";
import FakeAuthorizationDecorator from "../../src/application/decorator/AutenticatorAuthorization/FakeAuthorizationDecorator";

test("Should be created a new Transaction", async () => {
  const createTrasactionUseCase = new CreateTrasactionUseCase(
    new UserRepositoryMysql(new MysqlAdapter()),
    new TransactionRepositoryMysql(new MysqlAdapter()),
    new AutenticatosAuthorizationDecorator(
      new AuthorizationGatewayHttp(new AxiosAdapter())
    )
  );

  const output = await createTrasactionUseCase.execute({
    body: {
      payer: "42077",
      payee: "79476",
      value: 100,
    },
  });
  console.log(output);
  expect(output.statusCode).toBe(201);
});

test("Should be reject a Transaciton", async () => {
  const createTrasactionUseCase = new CreateTrasactionUseCase(
    new UserRepositoryMysql(new MysqlAdapter()),
    new TransactionRepositoryMysql(new MysqlAdapter()),
    new FakeAuthorizationDecorator()
  );
  const output = await createTrasactionUseCase.execute({
    body: {
      payer: "42077",
      payee: "79476",
      value: 25,
    },
  });
  expect(output.statusCode).toBe(422);
  expect(output.body).toBe("Transaction not authorized");
});
