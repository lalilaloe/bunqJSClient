import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaymentRequestObject from "../Types/PaymentRequestObject";
import Schedule from "../Types/Schedule";
import PaginationOptions from "../Types/PaginationOptions";
export default class SchedulePayment implements ApiEndpointInterface {
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
     * @param {number} paymentId
     * @param options
     * @returns {Promise<void>}
     */
    delete(userId: number, monetaryAccountId: number, paymentId: number, options?: any): Promise<any>;
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
     * @param {PaymentRequestObject} paymentRequestObject
     * @param {Schedule} schedule
     * @param options
     * @returns {Promise<void>}
     */
    post(userId: number, monetaryAccountId: number, paymentRequestObject: PaymentRequestObject, schedule: Schedule, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} scheduledPaymentId
     * @param {PaymentRequestObject} paymentRequestObject
     * @param {Schedule} schedule
     * @param options
     * @returns {Promise<void>}
     */
    put(userId: number, monetaryAccountId: number, scheduledPaymentId: number, paymentRequestObject: PaymentRequestObject, schedule: Schedule, options?: any): Promise<any>;
}
