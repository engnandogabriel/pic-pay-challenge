export default class Document {
  private cpf: string;
  private constructor(cpf: string) {
    this.cpf = cpf;
  }

  static setCPF(value: string) {
    let cpf = value.replace(/[^\d]/g, "");
    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      return new Document(cpf);
    }
    if (cpf.length === 14) {
      cpf = cpf.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
      return new Document(cpf);
    }
    throw new Error("CPF is Invalid!");
  }
  getValue(): string {
    return this.cpf;
  }
}
