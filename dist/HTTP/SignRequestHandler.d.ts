import BunqJSClient from "../BunqJSClient";
import Session from "../Session";
import LoggerInterface from "../Interfaces/LoggerInterface";
import Request from "./Request";
import ApiAdapterOptions from "../Types/ApiAdapterOptions";
export default class SignRequestHandler {
    Session: Session;
    logger: LoggerInterface;
    BunqJSClient: BunqJSClient;
    constructor(Session: Session, loggerInterface: LoggerInterface, BunqJSClient: BunqJSClient);
    /**
     * Signs a request using our privatekey
     * @param {Request} request
     * @param {ApiAdapterOptions} options
     * @returns {Promise<string>}
     */
    signRequest(request: Request, options: ApiAdapterOptions): Promise<void>;
}
