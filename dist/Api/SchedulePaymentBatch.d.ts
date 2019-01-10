import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import Schedule from "../Types/Schedule";
import PaymentRequestObjectCollection from "../Types/PaymentRequestObjectCollection";
export default class SchedulePaymentBatch implements ApiEndpointInterface {
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
    delete(userId: number, monetaryAccountId: number, paymentId: number, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaymentRequestObject} paymentRequestObject
     * @param {Schedule} schedule
     * @param options
     * @returns {Promise<void>}
     */
    post(userId: number, monetaryAccountId: number, paymentRequestObjectCollection: PaymentRequestObjectCollection, schedule: Schedule, options?: any): Promise<any>;
}
