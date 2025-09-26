/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ApiParams {
  page?: number;
  limit?: number;
  search?: string;
  searchField?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface BaseResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  error: string;
  details?: any;
  timestamp: string;
  path: string;
  method: string;
}

// Overload types untuk berbagai use case
export type ApiResponse<T> = T extends any[]
  ? PaginatedResponse<T[0]>
  : BaseResponse<T>;

// Custom error class
export class ApiError extends Error {
  statusCode?: number;
  details?: any;
  timestamp?: string;
  path?: string;
  method?: string;

  constructor(
    message: string,
    statusCode?: number,
    details?: any,
    timestamp?: string,
    path?: string,
    method?: string
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = timestamp;
    this.path = path;
    this.method = method;
  }
}

export class ApiService {
  // GET untuk fetch data (pagination)
  static async get<T>(
    endpoint: string,
    params: ApiParams = {}
  ): Promise<PaginatedResponse<T>> {
    return this.request<PaginatedResponse<T>>("GET", endpoint, null, params);
  }

  // GET by ID atau single resource
  static async getById<T>(
    endpoint: string,
    id: string | number
  ): Promise<BaseResponse<T>> {
    return this.request<BaseResponse<T>>("GET", `${endpoint}/${id}`);
  }

  // POST untuk create
  static async post<T>(endpoint: string, data: any): Promise<BaseResponse<T>> {
    return this.request<BaseResponse<T>>("POST", endpoint, data);
  }

  // PUT untuk update full resource
  static async put<T>(
    endpoint: string,
    id: string | number,
    data: any
  ): Promise<BaseResponse<T>> {
    return this.request<BaseResponse<T>>("PUT", `${endpoint}/${id}`, data);
  }

  // PATCH untuk partial update
  static async patch<T>(
    endpoint: string,
    id: string | number,
    data: any
  ): Promise<BaseResponse<T>> {
    return this.request<BaseResponse<T>>("PATCH", `${endpoint}/${id}`, data);
  }

  // DELETE
  static async delete<T>(
    endpoint: string,
    id: string | number
  ): Promise<BaseResponse<T>> {
    return this.request<BaseResponse<T>>("DELETE", `${endpoint}/${id}`);
  }

  // Generic request method
  private static async request<T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    endpoint: string,
    data?: any,
    params: ApiParams = {}
  ): Promise<T> {
    try {
      const url = new URL(`http://localhost:3000/${endpoint}`);

      // Add query parameters untuk GET requests
      if (method === "GET" && params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          // Tambahkan auth headers jika diperlukan
          // 'Authorization': `Bearer ${token}`,
        },
        credentials: "include",
      };

      // Add body untuk non-GET requests
      if (method !== "GET" && data) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url.toString(), config);
      const responseData = await response.json();

      if (!response.ok || responseData.success === false) {
        throw new ApiError(
          this.extractErrorMessage(responseData),
          responseData.statusCode ?? response.status,
          responseData.details,
          responseData.timestamp,
          responseData.path,
          responseData.method
        );
      }

      return responseData as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Network error or unable to reach server");
    }
  }

  private static extractErrorMessage(responseData: any): string {
    if (!responseData) return "No response from server";

    if (responseData.message) {
      if (Array.isArray(responseData.message)) {
        return responseData.message.join(", ");
      }
      if (typeof responseData.message === "string") {
        return responseData.message;
      }
    }

    if (responseData.error) {
      return String(responseData.error);
    }

    return "An unexpected error occurred";
  }
}
