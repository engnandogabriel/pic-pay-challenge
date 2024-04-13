import User from "../../src/domain/entities/User";

test("Should be created a User valid", async () => {
  const user = await User.create(
    "John Doe",
    "12345678910",
    "johndoe@gmail.com",
    "password123",
    "commun"
  );
  expect(user.getId()).toBeDefined();
  expect(user.getName()).toBe("John Doe");
  expect(user.getDocument()).toBe("123.456.789-10");
  expect(user.getEmail()).toBe("johndoe@gmail.com");
  expect(user.getPassword()).toBeDefined();
  expect(user.getTypeUser()).toBe("commun");
});

test("Should be create a User with a CNPJ valid", async () => {
  const user = await User.create(
    "John Doe",
    "12345678000199",
    "johndoe@gmail.com",
    "password123",
    "commun"
  );
  expect(user.getDocument()).toBe("12.345.678/0001-99");
});

test("Should verify if password is valid", async () => {
  const user = User.restore(
    "123",
    "johndoe@gmail.com",
    "12345678910",
    "johndoe@gmail.com",
    "594520296218431dbbf864b971f3d5fb6b45dce35038bd66df4f279db23937d97672f30e9a63f1f6c5be5cc787d0f38d26021a0497e5e458c4483d757e236cec",
    "commun"
  );
  const validate = await user.validatePassword("password123");
  expect(validate).toBe(true);
});
