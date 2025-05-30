import { request, APIRequestContext, APIResponse } from '@playwright/test';

export class APIClient {
  private context: APIRequestContext;

  async init() {
    this.context = await request.newContext();  // Uses config from playwright.config.ts
  }

  private async _request(method: 'get' | 'post' | 'put' | 'delete', path: string, data?: Record<string, any>) {
    const startTime = Date.now();
    let response: APIResponse;
    if (method === 'get' || method === 'delete') {
      response = await this.context[method](path);
    } else {
      response = await this.context[method](path, { data });
    }
    const duration = Date.now() - startTime;
    return {
      status: response.status(),
      body: await response.json().catch(() => null),
      headers: response.headers(),
      duration,
    };
  }

  async get(path: string) {
    return this._request('get', path);
  }

  async post(path: string, body: Record<string, any>) {
    return this._request('post', path, body);
  }

  async put(path: string, body: Record<string, any>) {
    return this._request('put', path, body);
  }

  async delete(path: string) {
    return this._request('delete', path);
  }

  async dispose() {
    await this.context.dispose();
  }
} 