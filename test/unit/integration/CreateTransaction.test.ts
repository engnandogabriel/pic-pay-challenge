import CreateTrasactionUseCase from "../../../src/application/CreateTransaction";
import MysqlAdapter from "../../../src/infra/DataBase/MysqlAdapter";
import TransactionRepositoryMysql from "../../../src/infra/Repository/TransactinRepositoryMysql";
import UserRepositoryMysql from "../../../src/infra/Repository/UserRepositoryMysql";

test("Should be created a new Transaction", async () => {
  const createTrasactionUseCase = new CreateTrasactionUseCase(
    new UserRepositoryMysql(new MysqlAdapter()),
    new TransactionRepositoryMysql(new MysqlAdapter())
  );

  const output = await createTrasactionUseCase.execute({
    body: {
      payer: "42077",
      payee: "79476",
      value: 25,
    },
  });
  expect(output.statusCode).toBe(201);
});
