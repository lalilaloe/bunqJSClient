import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
export default class Ip implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {number} ipId
     * @param options
     * @returns {Promise<void>}
     */
    get(userId: number, credentialPasswordIpId: number, ipId: number, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    list(userId: number, credentialPasswordIpId: number, options?: PaginationOptions): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {string} ip
     * @param {"ACTIVE" | "INACTIVE"} status
     * @param options
     * @returns {Promise<any>}
     */
    post(userId: number, credentialPasswordIpId: number, ip: string, status: "ACTIVE" | "INACTIVE", options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {number} ipId
     * @param {string} ip
     * @param {"ACTIVE" | "INACTIVE"} status
     * @param options
     * @returns {Promise<any>}
     */
    put(userId: number, credentialPasswordIpId: number, ipId: number, ip: string, status: "ACTIVE" | "INACTIVE", options?: any): Promise<any>;
}
