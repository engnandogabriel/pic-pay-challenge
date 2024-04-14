import axios from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdapter implements HttpClient {
  async post(url: any, data: any): Promise<any> {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (e: any) {
      return e.response.data;
    }
  }
  async get(url: any): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e: any) {
      return e.response.data;
    }
  }
}
