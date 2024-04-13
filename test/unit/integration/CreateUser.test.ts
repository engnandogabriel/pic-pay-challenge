import CreateUserUseCase from "../../../src/application/CreateUserUseCase";
import UserRepositoryMemory from "../../../src/infra/DataBase/UserRepositoryMemory";

test("Shold be created a User", async function () {
  const createUserUseCase = new CreateUserUseCase(new UserRepositoryMemory());
  const data = {
    name: "johndoe",
    document: "12345678910",
    email: "johndoe@gmail.com",
    password: "password123",
    type: "commun",
    amount: 1000,
  };
  const output = await createUserUseCase.execute({ body: data });
  expect(output.statusCode).toBe(201);
});
