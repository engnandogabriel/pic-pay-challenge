import User from "../entities/User";

export default interface EmailSenderGateway {
  sender(from: User, to: User, value: number): Promise<any>;
}
