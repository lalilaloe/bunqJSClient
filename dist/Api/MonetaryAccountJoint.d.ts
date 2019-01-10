import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import MonetaryAccountPutRequest from "../Types/MonetaryAccountPutRequest";
export default class MonetaryAccountJoint implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param {number} userId
     * @param {number} monetaryAccountJointId
     * @param options
     * @returns {Promise<any>}
     */
    get(userId: number, monetaryAccountJointId: number, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    list(userId: number, options?: PaginationOptions): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {monetaryAccountPutRequest} MonetaryAccountPutRequest
     * @param op¶tions
     * @returns {Promise<any>}
     */
    put(userId: number, accountId: number, monetaryAccountPutRequest: MonetaryAccountPutRequest, options?: any): Promise<any>;
}
