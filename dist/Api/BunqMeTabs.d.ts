import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import Amount from "../Types/Amount";
import PaginationOptions from "../Types/PaginationOptions";
export default class BunqMeTabs implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} paymentId
     * @param options
     * @returns {Promise<void>}
     */
    get(userId: number, monetaryAccountId: number, tabId: number, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    list(userId: number, monetaryAccountId: number, options?: PaginationOptions): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {string} description
     * @param {Amount} amount
     * @param options
     * @returns {Promise<void>}
     */
    post(userId: number, monetaryAccountId: number, description: string, amount: Amount, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} bunqMeTabId
     * @param {string} status
     * @returns {Promise<void>}
     */
    put(userId: number, monetaryAccountId: number, bunqMeTabId: number, status?: string): Promise<any>;
}
