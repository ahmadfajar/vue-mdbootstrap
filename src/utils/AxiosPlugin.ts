import type { IHttpService, TRecord } from '@/types';
import type { AxiosError, AxiosResponse, RawAxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { App, ObjectPlugin } from 'vue';

declare interface IRequestConfig extends RawAxiosRequestConfig {
  requestHandler: CallableFunction;
  requestErrorHandler: CallableFunction;
  responseHandler: CallableFunction;
  responseErrorHandler: CallableFunction;
}

function _axiosPlugin(options?: RawAxiosRequestConfig) {
  const defaultOptions: IRequestConfig = {
    // request interceptor handler
    requestHandler: (config: unknown) => config,
    requestErrorHandler: (error: AxiosError) => Promise.reject(error),
    // response interceptor handler
    responseHandler: (response: AxiosResponse) => response,
    responseErrorHandler: (error: AxiosError) => Promise.reject(error),
  };

  const initOptions: IRequestConfig = {
    ...defaultOptions,
    ...options,
  };

  const service = axios.create(initOptions);

  if (options && Object.keys(options).length > 0) {
    const _keys = Object.keys(options);

    // Register interceptor if criteria matched.
    if (
      (_keys.includes('baseURL') && _keys.length > 1) ||
      (!_keys.includes('baseURL') && _keys.length > 0)
    ) {
      // Add a request interceptor
      service.interceptors.request.use(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
        (config) => initOptions.requestHandler(config),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
        (error) => initOptions.requestErrorHandler(error)
      );
      // Add a response interceptor
      service.interceptors.response.use(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
        (response) => initOptions.responseHandler(response),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
        (error) => initOptions.responseErrorHandler(error)
      );
    }
  }

  const http: IHttpService = {
    get: (url: string, data?: TRecord, options?: RawAxiosRequestConfig) => {
      const config = {
        ...options,
        params: data,
      };

      return service.get(url, config);
    },
    patch: (url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig) => {
      if (data instanceof FormData) {
        return service.patchForm(url, data, options);
      }

      return service.patch(url, data, options);
    },
    post: (url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig) => {
      if (data instanceof FormData) {
        return service.postForm(url, data, options);
      }

      return service.post(url, data, options);
    },
    put: (url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig) => {
      if (data instanceof FormData) {
        return service.putForm(url, data, options);
      }

      return service.put(url, data, options);
    },
    delete: (url: string, data?: TRecord, options?: RawAxiosRequestConfig) => {
      const config = {
        ...options,
        data: data,
      };

      return service.delete(url, config);
    },
  };

  return { service, http };
}

export const AxiosPlugin: ObjectPlugin = {
  install: (app: App, options?: RawAxiosRequestConfig): void => {
    const { service, http } = _axiosPlugin(options);
    app.config.globalProperties.$axios = service;
    app.config.globalProperties.$http = http;
  },
};
