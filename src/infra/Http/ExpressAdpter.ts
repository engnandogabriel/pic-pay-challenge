import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";
import cors from "cors";
export default class ExpressAdapter implements HttpServer {
  app: any;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }
  on(method: string, url: string, callback: Function): any {
    this.app[method](url, async function (req: Request, res: Response) {
      try {
        const output = await callback(req);
        return res.status(output.statusCode).json({ body: output.body });
      } catch (e: any) {
        return res
          .status(500)
          .json({ statusCode: 422, message: e.message, erro: true });
      }
    });
  }
  async listen(port: number) {
    this.app.listen(port, () => console.log("SERVER RUNNING IN PORT: ", port));
  }
}
