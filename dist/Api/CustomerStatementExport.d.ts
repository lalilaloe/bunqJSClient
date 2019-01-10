import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
export default class CustomerStatementExport implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {"CSV" | "PDF" | "MT940"} statement_format
     * @param {Date} date_start
     * @param {Date} date_end
     * @param options
     * @returns {Promise<any>}
     */
    post(userId: number, accountId: number, statement_format: "CSV" | "PDF" | "MT940", date_start: Date, date_end: Date, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {number} customerStatementId
     * @param options
     * @returns {Promise}
     */
    get(userId: number, accountId: number, customerStatementId: number, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {number} customerStatementId
     * @param options
     * @returns {Promise}
     */
    delete(userId: number, accountId: number, customerStatementId: number, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param options
     * @returns {Promise}
     */
    list(userId: number, accountId: number, options?: any): Promise<any>;
}
