import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
export default class User implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param {number} userId
     * @param options
     * @returns {Promise<any>}
     */
    get(userId: number, options?: any): Promise<any>;
    /**
     * @param options
     * @returns {Promise<any>}
     */
    list(options?: any): Promise<any>;
}
