export default class Email {
  private email: string;
  private constructor(email: string) {
    this.email = email;
  }

  static setEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      const formattedEmail = email.toLocaleLowerCase();
      return new Email(formattedEmail);
    }
    throw new Error("E-email is Invalid");
  }
  getValue() {
    return this.email;
  }
}
