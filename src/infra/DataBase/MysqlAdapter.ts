import IConnection from "./Connection";
import mysql from "mysql2/promise";
export default class MysqlAdapter implements IConnection {
  connection: any;
  constructor() {}
  async connect(): Promise<void> {
    this.connection = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "root",
      port: 3306,
    });
  }
  async query(
    statement: string,
    data: any,
    transactional = false
  ): Promise<any> {
    return this.connection.query(statement, data, transactional);
  }
  async close(): Promise<void> {
    this.connection.end();
  }
}
