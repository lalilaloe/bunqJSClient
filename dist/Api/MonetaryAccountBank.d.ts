import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import AmountValue from "../Types/AmountValue";
import MonetaryAccountPutRequest from "../Types/MonetaryAccountPutRequest";
export default class MonetaryAccountBank implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param {number} userId
     * @param {number} monetaryAccountBankId
     * @param options
     * @returns {Promise<any>}
     */
    get(userId: number, monetaryAccountBankId: number, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    list(userId: number, options?: PaginationOptions): Promise<any>;
    /**
     * @param {number} userId
     * @param {string} currency
     * @param {string} description
     * @param {AmountValue} dailyLimit
     * @param {string} color
     * @param options
     * @returns {Promise<void>}
     */
    post(userId: number, currency: string, description: string, dailyLimit: AmountValue, color: string, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {monetaryAccountPutRequest} MonetaryAccountPutRequest
     * @param options
     * @returns {Promise<any>}
     */
    put(userId: number, accountId: number, monetaryAccountPutRequest: MonetaryAccountPutRequest, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {"CANCELLED"} status
     * @param {"REDEMPTION_VOLUNTARY"} sub_status
     * @param {string} reason
     * @param options
     * @returns {Promise<any>}
     */
    putCancel(userId: number, accountId: number, status: "CANCELLED", sub_status: "REDEMPTION_VOLUNTARY", reason: string, options?: any): Promise<any>;
}
