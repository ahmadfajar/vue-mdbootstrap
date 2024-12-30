import type { RawAxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { App, ObjectPlugin } from 'vue';
import type { IHttpService, TRecord } from '../types';

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
        requestErrorHandler: (error: unknown) => Promise.reject(error),
        // response interceptor handler
        responseHandler: (response: unknown) => response,
        responseErrorHandler: (error: unknown) => Promise.reject(error),
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
                (config) => initOptions.requestHandler(config),
                (error) => initOptions.requestErrorHandler(error)
            );
            // Add a response interceptor
            service.interceptors.response.use(
                (response) => initOptions.responseHandler(response),
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
