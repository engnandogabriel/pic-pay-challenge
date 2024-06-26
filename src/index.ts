import CreateTrasactionUseCase from "./application/CreateTransaction";
import CreateUserUseCase from "./application/CreateUserUseCase";
import GetTransactionUseCase from "./application/GetTransactionUseCase";
import GetUserUseCase from "./application/GetUserUseCase";
import TransactionController from "./infra/Controller/TransactionController";
import UserController from "./infra/Controller/UserController";
import MysqlAdapter from "./infra/DataBase/MysqlAdapter";
import AxiosAdapter from "./infra/Http/AxiosAdapter";
import ExpressAdapter from "./infra/Http/ExpressAdpter";
import TransactionRepositoryMysql from "./infra/Repository/TransactinRepositoryMysql";
import UserRepositoryMysql from "./infra/Repository/UserRepositoryMysql";
import AutenticatosAuthorizationDecorator from "./application/decorator/AutenticatorAuthorization/AutenticatorAuthorization";
import AuthorizationGatewayHttp from "./infra/gateway/AuthorizationGateway";
import MainController from "./infra/Controller/MainController";
import GetAllUsers from "./application/GetAllUsersUseCase";
import GetAllTransactionUseCase from "./application/GetAllTransactionsUseCase";
import EmailSender from "./infra/gateway/EmailSender";
const http = new ExpressAdapter();

const createUserUseCase = new CreateUserUseCase(
  new UserRepositoryMysql(new MysqlAdapter())
);
const getUserUseCase = new GetUserUseCase(
  new UserRepositoryMysql(new MysqlAdapter())
);
const getAllUserUseCase = new GetAllUsers(
  new UserRepositoryMysql(new MysqlAdapter())
);
const createTransactionUseCase = new CreateTrasactionUseCase(
  new UserRepositoryMysql(new MysqlAdapter()),
  new TransactionRepositoryMysql(new MysqlAdapter()),
  new AutenticatosAuthorizationDecorator(
    new AuthorizationGatewayHttp(new AxiosAdapter())
  ),
  new EmailSender(new AxiosAdapter())
);
const getTransactionUseCase = new GetTransactionUseCase(
  new TransactionRepositoryMysql(new MysqlAdapter())
);
const getAllTransactions = new GetAllTransactionUseCase(
  new TransactionRepositoryMysql(new MysqlAdapter())
);
new MainController(http);
new UserController(http, createUserUseCase, getUserUseCase, getAllUserUseCase);
new TransactionController(
  http,
  createTransactionUseCase,
  getTransactionUseCase,
  getAllTransactions
);
http.listen(8080);
