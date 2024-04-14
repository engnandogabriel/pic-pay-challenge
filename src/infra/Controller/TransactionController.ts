import UseCase from "../../application/UseCase";
import HttpServer from "../Http/HttpServer";

export default class TransactionController {
  httpServer: HttpServer;
  createTransaction: UseCase;
  getTransaction: UseCase;
  getAllTransactions: UseCase;
  constructor(
    httpServer: HttpServer,
    createTransaction: UseCase,
    getTransaction: UseCase,
    getAllTransactions: UseCase
  ) {
    this.httpServer = httpServer;
    this.createTransaction = createTransaction;
    this.getTransaction = getTransaction;
    this.getAllTransactions = getAllTransactions;

    this.httpServer.on("post", "/transfer", async (req: any) => {
      const output = await this.createTransaction.execute(req);
      return output;
    });
    this.httpServer.on("get", "/transfer/:id", async (req: any) => {
      const output = await this.getTransaction.execute(req);
      return output;
    });
    this.httpServer.on("get", "/transfer", async (req: any) => {
      const output = await this.getAllTransactions.execute(req);
      return output;
    });
  }
}
