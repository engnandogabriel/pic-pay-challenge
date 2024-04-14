import CreateTrasactionUseCase from "../../application/CreateTransaction";
import GetTransactionUseCase from "../../application/GetTransactionUseCase";
import HttpServer from "../Http/HttpServer";

export default class TransactionController {
  httpServer: HttpServer;
  createTransaction: CreateTrasactionUseCase;
  getTransaction: GetTransactionUseCase;
  constructor(
    httpServer: HttpServer,
    createTransaction: CreateTrasactionUseCase,
    getTransaction: GetTransactionUseCase
  ) {
    this.httpServer = httpServer;
    this.createTransaction = createTransaction;
    this.getTransaction = getTransaction;

    this.httpServer.on("post", "/transaction", async (req: any) => {
      const output = await this.createTransaction.execute(req);
      return output;
    });
    this.httpServer.on("get", "/transaction/:id", async (req: any) => {
      const output = await this.getTransaction.execute(req);
      return output;
    });
  }
}
