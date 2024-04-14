import CreateTrasactionUseCase from "./application/CreateTransaction";
import CreateUserUseCase from "./application/CreateUserUseCase";
import GetTransactionUseCase from "./application/GetTransactionUseCase";
import GetUserUseCase from "./application/GetUserUseCase";
import Transaction from "./domain/entities/Transaction";
import TransactionController from "./infra/Controller/TransactionController";
import UserController from "./infra/Controller/UserController";
import MysqlAdapter from "./infra/DataBase/MysqlAdapter";
import ExpressAdapter from "./infra/Http/ExpressAdpter";
import TransactionRepositoryMysql from "./infra/Repository/TransactinRepositoryMysql";
import UserRepositoryMysql from "./infra/Repository/UserRepositoryMysql";
const http = new ExpressAdapter();

const createUserUseCase = new CreateUserUseCase(
  new UserRepositoryMysql(new MysqlAdapter())
);
const getUserUseCase = new GetUserUseCase(
  new UserRepositoryMysql(new MysqlAdapter())
);
const createTransactionUseCase = new CreateTrasactionUseCase(
  new UserRepositoryMysql(new MysqlAdapter()),
  new TransactionRepositoryMysql(new MysqlAdapter())
);
const getTransactionUseCase = new GetTransactionUseCase(
  new TransactionRepositoryMysql(new MysqlAdapter())
);
new UserController(http, createUserUseCase, getUserUseCase);
new TransactionController(
  http,
  createTransactionUseCase,
  getTransactionUseCase
);
http.listen(8080);
