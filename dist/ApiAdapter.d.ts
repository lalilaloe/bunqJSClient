import BunqJSClient from "./BunqJSClient";
import Session from "./Session";
import Headers from "./Types/Headers";
import LoggerInterface from "./Interfaces/LoggerInterface";
import ApiAdapterOptions from "./Types/ApiAdapterOptions";
import { Method } from "./Types/Method";
import RequestLimitFactory from "./RequestLimitFactory";
import SignRequestHandler from "./HTTP/SignRequestHandler";
import VerifyResponseHandler from "./HTTP/VerifyResponseHandler";
export declare const BUNQ_SERVER_SIGNATURE_HEADER_KEY = "X-Bunq-Server-Signature";
export declare const BUNQ_REQUEST_SIGNATURE_HEADER_KEY = "X-Bunq-Client-Signature";
export declare const BUNQ_REQUEST_AUTHENTICATION_HEADER_KEY = "X-Bunq-Client-Authentication";
export default class ApiAdapter {
    Session: Session;
    logger: LoggerInterface;
    BunqJSClient: BunqJSClient;
    RequestLimitFactory: RequestLimitFactory;
    SignRequestHandler: SignRequestHandler;
    VerifyResponseHandler: VerifyResponseHandler;
    language: string;
    region: string;
    geoLocation: string;
    constructor(Session: Session, loggerInterface: LoggerInterface, BunqJSClient: BunqJSClient);
    setup(): Promise<void>;
    /**
     * @param {string} url
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    get(url: string, headers?: any, options?: ApiAdapterOptions): Promise<any>;
    /**
     * @param {string} url
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    delete(url: string, headers?: any, options?: ApiAdapterOptions): Promise<any>;
    /**
     * @param {string} url
     * @param data
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    post(url: string, data?: any, headers?: any, options?: ApiAdapterOptions): Promise<any>;
    /**
     * @param {string} url
     * @param data
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    put(url: string, data?: any, headers?: any, options?: ApiAdapterOptions): Promise<any>;
    /**
     * @param {string} url
     * @param {string} method
     * @param data
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<any>}
     */
    request(url: string, method?: Method, data?: any, headers?: Headers, options?: ApiAdapterOptions): Promise<any>;
    /**
     * Checks if the session is valid and waits for it to be refreshed
     * @returns {Promise<void>}
     */
    private sessionValidationCheck;
    /**
     * Attempts to improve the error data and defaults to rethrowing it
     * @param error
     */
    private requestErrorHandler;
}
