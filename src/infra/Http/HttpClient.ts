export default interface HttpClient {
  post(url: any, data: any): Promise<any>;
  get(url: any): Promise<any>;
}
