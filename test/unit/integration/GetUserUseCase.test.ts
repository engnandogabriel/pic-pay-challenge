import GetUserUseCase from "../../../src/application/GetUserUseCase";
import User from "../../../src/domain/entities/User";
import MysqlAdapter from "../../../src/infra/DataBase/MysqlAdapter";
import UserRepositoryMemory from "../../../src/infra/Repository/UserRepositoryMemory";
import UserRepositoryMysql from "../../../src/infra/Repository/UserRepositoryMysql";

test.skip("Should return a User", async () => {
  const getUserUseCase = new GetUserUseCase(
    new UserRepositoryMysql(new MysqlAdapter())
  );
  const output = await getUserUseCase.execute({
    params: { document: "123.456.789-10" },
  });
  expect(output.statusCode).toBe(200);
  expect(output.body.id).toBeDefined();
  expect(output.body.document).toBe("123.456.789-10");
});
