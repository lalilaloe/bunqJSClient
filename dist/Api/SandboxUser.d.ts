import ApiAdapter from "../ApiAdapter";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import Session from "../Session";
export default class SandboxUser implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param options
     * @returns {Promise<{}>}
     */
    post(options?: any): Promise<any>;
}
