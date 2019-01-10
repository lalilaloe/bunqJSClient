import BunqJSClient from "../BunqJSClient";
import Session from "../Session";
import LoggerInterface from "../Interfaces/LoggerInterface";
export default class VerifyResponseHandler {
    Session: Session;
    logger: LoggerInterface;
    BunqJSClient: BunqJSClient;
    constructor(Session: Session, loggerInterface: LoggerInterface, BunqJSClient: BunqJSClient);
    /**
     * Verifies the response of a request
     * @param response
     * @returns {Promise<boolean>}
     */
    verifyResponse(response: any): Promise<boolean>;
}
