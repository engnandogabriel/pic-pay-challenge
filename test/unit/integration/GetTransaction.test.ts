import GetTransactionUseCase from "../../../src/application/GetTransactionUseCase";
import MysqlAdapter from "../../../src/infra/DataBase/MysqlAdapter";
import TransactionRepositoryMysql from "../../../src/infra/Repository/TransactinRepositoryMysql";

test("Should be return a Transaction", async () => {
  const getTransactionUseCase = new GetTransactionUseCase(
    new TransactionRepositoryMysql(new MysqlAdapter())
  );
  const output = await getTransactionUseCase.execute({ body: { id: "63563" } });
  expect(output.statusCode).toBe(200);
  expect(output.body.id).toBe(63563);
});
