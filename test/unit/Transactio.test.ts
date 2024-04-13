import Transaction from "../../src/domain/entities/Transaction";
import User from "../../src/domain/entities/User";

test("Shold be create a new Transaction", async () => {
  const payer = await User.create(
    "johndoe",
    "12345678910",
    "johndoe@gmail.com",
    "password123",
    "commun",
    1000
  );
  const payee = await User.create(
    "nando",
    "45678912345",
    "nando@gmail.com",
    "password456",
    "merchant",
    30
  );
  const transaction = Transaction.create(payer, payee, 600);
  expect(transaction.getId()).toBeDefined();
  expect(transaction.getPayer()).toBeDefined();
  expect(transaction.getPayee()).toBeDefined();
  expect(transaction.getValue()).toBe(600);
});

test("Should throw an Error: Must have a amount greater than transaction value", async function () {
  expect(async () =>
    Transaction.create(
      await User.create(
        "johndoe",
        "12345678910",
        "johndoe@gmail.com",
        "password123",
        "commun",
        1000
      ),
      await User.create(
        "nando",
        "45678912345",
        "nando@gmail.com",
        "password456",
        "merchant",
        30
      ),
      1250
    )
  ).rejects.toThrow(
    new Error("Must have a amount greater than transaction value")
  );
});

test("Should throw an Error: Must be a user commun", async function () {
  expect(async () =>
    Transaction.create(
      await User.create(
        "johndoe",
        "12345678910",
        "johndoe@gmail.com",
        "password123",
        "merchant",
        1000
      ),
      await User.create(
        "nando",
        "45678912345",
        "nando@gmail.com",
        "password456",
        "merchant",
        30
      ),
      30
    )
  ).rejects.toThrow(new Error("Must be a user commun"));
});
