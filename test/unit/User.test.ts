import User from "../../src/domain/entities/User";

test("Should be created a User", () => {
  const user = new User(
    "John Doe",
    "123456789-10",
    "johndoe@gmail.com",
    "password123",
    "commun"
  );
  expect(user.name).toBe("John Doe");
  expect(user.document).toBe("123456789-10");
  expect(user.email).toBe("johndoe@gmail.com");
  expect(user.password).toBe("password123");
  expect(user.type).toBe("commun");
});
