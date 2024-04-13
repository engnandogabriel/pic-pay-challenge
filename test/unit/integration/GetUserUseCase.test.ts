import GetUserUseCase from "../../../src/application/GetUserUseCase";
import User from "../../../src/domain/entities/User";
import UserRepositoryMemory from "../../../src/infra/DataBase/UserRepositoryMemory";

test("Should return a User", async () => {
  const user = await User.create(
    "John Doe",
    "12345678910",
    "johndoe@gmail.com",
    "password123",
    "commun",
    1000
  );
  const userRepository = new UserRepositoryMemory();
  userRepository.save(user);
  const getUserUseCase = new GetUserUseCase(userRepository);
  const output = await getUserUseCase.execute({
    params: { document: "123.456.789-10" },
  });
  expect(output.statusCode).toBe(200);
  expect(output.body.id).toBeDefined();
});
