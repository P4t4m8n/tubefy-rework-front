import Axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "//localhost:3030/api/";

const axiosInstance = Axios.create({
  withCredentials: true,
});

interface HttpService {
  get<T>(endpoint: string, data?: unknown): Promise<T>;
  post<T>(endpoint: string, data?: unknown): Promise<T>;
  put<T>(endpoint: string, data?: unknown): Promise<T>;
  delete<T>(endpoint: string, data?: unknown): Promise<T>;
}

export const httpService: HttpService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

const ajax = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: unknown = null
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
    };
    const res = await axiosInstance(config);
    return res.data;
  } catch (err: unknown) {
    if (
      Axios.isAxiosError(err) &&
      err.response &&
      err.response.status === 401
    ) {
      sessionStorage.clear();
    }

    if (
      Axios.isAxiosError(err) &&
      err.response?.status === 409 &&
      err.response?.data?.message
    ) {
      throw new Error(err.response.data.message, { cause: 409 });
    }

    throw err;
  }
};
