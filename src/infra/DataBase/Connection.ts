export default interface IConnection {
  connect(): Promise<void>;
  query(statement: string, data: any, transactional: boolean): Promise<any>;
  close(): Promise<void>;
}
