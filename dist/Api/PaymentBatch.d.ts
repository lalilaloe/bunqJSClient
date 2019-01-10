import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import Amount from "../Types/Amount";
import CounterPartyAliasCollection from "../Types/CounterPartyAliasCollection";
import PaginationOptions from "../Types/PaginationOptions";
export default class PaymentBatch implements ApiEndpointInterface {
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
    get(userId: number, monetaryAccountId: number, paymentId: number, options?: any): Promise<any>;
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
     * @param {CounterPartyAliasCollection} counterpartyAliasCollection
     * @param options
     * @returns {Promise<void>}
     */
    post(userId: number, monetaryAccountId: number, description: string, amount: Amount, counterpartyAliasCollection: CounterPartyAliasCollection, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {string} description
     * @param {Amount} amount
     * @param {CounterPartyAliasCollection} counterpartyAliasCollection
     * @param options
     * @returns {Promise<void>}
     */
    postRaw(userId: number, monetaryAccountId: number, payments: any[], options?: any): Promise<any>;
}
