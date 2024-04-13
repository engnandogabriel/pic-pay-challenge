export default class Document {
  private document: string;
  private constructor(document: string) {
    this.document = document;
  }

  static setDocument(value: string) {
    let document = value.replace(/[^\d]/g, "");
    if (document.length === 11) {
      document = document.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      );
      return new Document(document);
    }
    if (document.length === 14) {
      document = document.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
      return new Document(document);
    }
    throw new Error("Document is Invalid!");
  }
  getValue(): string {
    return this.document;
  }
}
