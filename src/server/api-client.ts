import { configApiSchema } from "@/config/api";
import { getConfig } from "@/config/get-config";
import { z } from "zod";

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = getConfig(configApiSchema).API_BASE_URL;
  }

  async get<T>(path: string, schema: z.ZodSchema<T>, options?: RequestInit) {
    const response = await fetch(`${this.baseUrl}${path}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return schema.parse(data);
  }

  async post<T>(
    path: string,
    body: unknown,
    options?: RequestInit,
    schema?: z.ZodSchema<T>
  ) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return schema ? schema.parse(data) : data;
  }

  async put<T>(
    path: string,
    body: unknown,
    options?: RequestInit,
    schema?: z.ZodSchema<T>
  ) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return schema ? schema.parse(data) : data;
  }

  async delete(path: string, options?: RequestInit) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
}
