import { Response } from 'node-fetch';

interface HttpClient {
  post(endpoint: string, body: Record<string, unknown>): Promise<Response>;
}

export default HttpClient;
