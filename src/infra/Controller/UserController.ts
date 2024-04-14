import UseCase from "../../application/UseCase";
import HttpServer from "../Http/HttpServer";

export default class UserController {
  httpServer: HttpServer;
  createUser: UseCase;
  getUser: UseCase;
  getAllUser: UseCase;
  constructor(
    httpServer: HttpServer,
    createUser: UseCase,
    getUser: UseCase,
    getAllUser: UseCase
  ) {
    this.httpServer = httpServer;
    this.createUser = createUser;
    this.getUser = getUser;
    this.getAllUser = getAllUser;

    this.httpServer.on("post", "/user", async (req: any) => {
      const output = await this.createUser.execute(req);
      return output;
    });
    this.httpServer.on("get", "/user/:document", async (req: any) => {
      const output = await this.getUser.execute(req);
      return output;
    });
    this.httpServer.on("get", "/user", async (req: any) => {
      const output = await this.getAllUser.execute(req);
      return output;
    });
  }
}
