import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
export default class SessionServer implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param options
     * @returns {Promise<{id; token: any; serverPublicKey: any}>}
     */
    add(options?: any): Promise<{
        id: any;
        token: any;
        user_info: any;
    }>;
    /**
     * @param options
     * @returns {Promise<{id; token: any; user_info}>}
     */
    delete(options?: any): Promise<boolean>;
}
