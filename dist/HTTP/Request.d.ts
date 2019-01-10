import { AxiosRequestConfig } from "axios";
import { Method } from "../Types/Method";
import Headers from "../Types/Headers";
export declare const DEFAULT_HEADERS: Headers;
export default class Request {
    private _url;
    private _method;
    private _data;
    private _headers;
    private _options;
    private _isSigned;
    private _isAuthenticated;
    private _requestConfig;
    constructor(url: string, method?: Method, data?: any, headers?: any, options?: any);
    readonly url: string;
    readonly method: Method;
    readonly data: any;
    readonly headers: Headers;
    readonly isSigned: string | false;
    readonly isAuthenticated: string | false;
    readonly requestConfig: AxiosRequestConfig;
    setSigned(signature: string | false): void;
    setAuthenticated(token: string | false): void;
    setUrl(url: string): void;
    setData(data: any): void;
    getHeader(key: string): string | false;
    removeHeader(key: string): void;
    setHeader(key: string, value: any): void;
    removeOption(key: string): void;
    setOption(key: string, value: any): void;
    /**
     * Generates a list of the required headers
     * @param {Header[]} customHeaders
     */
    private getHeaders;
}
