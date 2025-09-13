import { TRecord } from '@/types';
import { AxiosPromise, RawAxiosRequestConfig } from 'axios';
import { Plugin } from 'vue';

export declare interface IHttpService {
  /**
   * Send HTTP GET to the remote server.
   *
   * @param url     API url
   * @param data    The data to be sent
   * @param options Additional options
   * @returns Promise instance
   */
  get(url: string, data?: TRecord, options?: RawAxiosRequestConfig): AxiosPromise;

  /**
   * Send HTTP PATCH to the remote server.
   *
   * @param url     API url
   * @param data    The data to be sent
   * @param options Additional options
   * @returns Promise instance
   */
  patch(url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig): AxiosPromise;

  /**
   * Send HTTP POST to the remote server.
   *
   * @param url     API url
   * @param data    The data to be sent
   * @param options Additional options
   * @returns Promise instance
   */
  post(url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig): AxiosPromise;

  /**
   * Send HTTP PUT to the remote server.
   *
   * @param url     API url
   * @param data    The data to be sent
   * @param options Additional options
   * @returns Promise instance
   */
  put(url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig): AxiosPromise;

  /**
   * Send HTTP DELETE to the remote server.
   *
   * @param url     API url
   * @param data    The data to be sent
   * @param options Additional options
   * @returns Promise instance
   */
  delete(url: string, data?: TRecord, options?: RawAxiosRequestConfig): AxiosPromise;
}

export declare const AxiosPlugin: Plugin;
