export default interface AuthorizationGateway {
  authorization(): Promise<any>;
}
