import User from "../../src/domain/entities/User";

test("Should be created a User valid", () => {
  const user = new User(
    "John Doe",
    "12345678910",
    "johndoe@gmail.com",
    "password123",
    "commun"
  );
  expect(user.name).toBe("John Doe");
  expect(user.document.getValue()).toBe("123.456.789-10");
  expect(user.email).toBe("johndoe@gmail.com");
  expect(user.password).toBe("password123");
  expect(user.type).toBe("commun");
});

test("Should be create a User with a CNPJ valid", () => {
  const user = new User(
    "John Doe",
    "12345678000199",
    "johndoe@gmail.com",
    "password123",
    "commun"
  );
  expect(user.document.getValue()).toBe("12.345.678/0001-99");
});
