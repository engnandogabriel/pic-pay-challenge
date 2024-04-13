import User from "../../src/domain/entities/User";

test("Should be created a User valid", () => {
  const user = User.create(
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
  expect(user.getPassword()).toBe("password123");
  expect(user.getTypeUser()).toBe("commun");
});

test("Should be create a User with a CNPJ valid", () => {
  const user = User.create(
    "John Doe",
    "12345678000199",
    "johndoe@gmail.com",
    "password123",
    "commun"
  );
  expect(user.getDocument()).toBe("12.345.678/0001-99");
});
