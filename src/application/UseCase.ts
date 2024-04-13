import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";

export default interface UseCase {
  execute(data: HttpRequest): Promise<HttpResponse>;
}
