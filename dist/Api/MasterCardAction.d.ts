import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
export default class MasterCardAction implements ApiEndpointInterface {
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
    get(userId: number, monetaryAccountId: number, masterCardActionId: number): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaginationOptions} options
     * @returns {Promise<any>}
     */
    list(userId: number, monetaryAccountId: number, options?: PaginationOptions): Promise<any>;
}
