test("Shold be create a new Transaction", () => {
  const transaction = new Transaction("1", "2", 600);
  expect(transaction.id).toBeDefined();
  expect(transaction.payer).toBe("1");
  expect(transaction.payee).toBe("2");
  expect(transaction.value).toBe(600);
});
