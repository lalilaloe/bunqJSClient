import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
interface EventFilterOptions extends PaginationOptions {
    monetary_account_id?: number | false;
    display_user_event?: 1 | 0;
    status?: "AWAITING_REPLY" | "FINALIZED" | false;
}
export default class Event implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param {number} userId
     * @param {number} eventId
     * @param options
     * @returns {Promise<void>}
     */
    get(userId: number, eventId: number, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    list(userId: number, options?: EventFilterOptions): Promise<any>;
}
export {};
