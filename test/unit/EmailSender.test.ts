import User from "../../src/domain/entities/User";
import AxiosAdapter from "../../src/infra/Http/AxiosAdapter";
import EmailSender from "../../src/infra/gateway/EmailSender";

test("Shold be send a e-mail", async () => {
  const from = await User.create(
    "johndoe",
    "12345678910",
    "johndoe@gmail.com",
    "password",
    "commun",
    500
  );
  const to = await User.create(
    "nando",
    "98765432156",
    "nando@gmail.com",
    "password",
    "merchant",
    100
  );
  const emailSender = new EmailSender(new AxiosAdapter());
  const output = await emailSender.sender(from, to, 250);
  expect(output.response.message).toBe(true);
});
