import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
export default class DeviceRegistration implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    add(options?: any): Promise<any>;
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    get(options?: any): Promise<any>;
}
