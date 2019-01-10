import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
export default class CardCvc2 implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} requestResponseId
     * @returns {Promise<any>}
     */
    get(userId: number, cardId: number, cvc2Id: number): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {any} options
     * @returns {Promise<any>}
     */
    list(userId: number, cardId: number, options?: any): Promise<any>;
}
