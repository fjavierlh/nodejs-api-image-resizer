import HttpClient from '../../../domain/Shared/HttpClient/HttpClient.interface';
import fetch, { Response } from 'node-fetch';

class FecthHttpClient implements HttpClient {
  private readonly apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public async post(
    endpoint: string,
    request: Record<string, unknown>
  ): Promise<Response> {
    return fetch(`${this.apiUrl}${endpoint}`, {
      method: 'POST',
      ...request
    });
  }
}

export default FecthHttpClient;
