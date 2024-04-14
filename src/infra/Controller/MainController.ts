import HttpServer from "../Http/HttpServer";

export default class MainController {
  httpServer: HttpServer;
  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.httpServer.on("get", "/", async (req: any) => {
      return {
        statusCode: 200,
        body: {
          title: "PicPay Simplificado",
          message:
            "Bem vindo ao teste técnico Pic Pay. Esse projeto foi desenvolvido com o objetivo de treinar meus conhecimentos em backend com NodeJs e TypeScript",
        },
      };
    });
  }
}
