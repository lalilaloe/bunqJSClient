"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SchedulePayment {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} paymentId
     * @param options
     * @returns {Promise<void>}
     */
    async get(userId, monetaryAccountId, paymentId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/schedule-payment");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment/${paymentId}`));
        return response.Response[0];
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} paymentId
     * @param options
     * @returns {Promise<void>}
     */
    async delete(userId, monetaryAccountId, paymentId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/schedule-payment", "DELETE");
        const response = await limiter.run(async () => this.ApiAdapter.delete(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment/${paymentId}`));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    async list(userId, monetaryAccountId, options = {
        count: 200,
        newer_id: false,
        older_id: false
    }) {
        const params = {};
        if (options.count !== undefined) {
            params.count = options.count;
        }
        if (options.newer_id !== false && options.newer_id !== undefined) {
            params.newer_id = options.newer_id;
        }
        if (options.older_id !== false && options.older_id !== undefined) {
            params.older_id = options.older_id;
        }
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/schedule-payment", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment`, {}, {
            axiosOptions: {
                params: params
            }
        }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaymentRequestObject} paymentRequestObject
     * @param {Schedule} schedule
     * @param options
     * @returns {Promise<void>}
     */
    async post(userId, monetaryAccountId, paymentRequestObject, schedule, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/schedule-payment", "POST");
        const requestObject = {
            payment: paymentRequestObject,
            schedule: schedule
        };
        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment`, requestObject));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} scheduledPaymentId
     * @param {PaymentRequestObject} paymentRequestObject
     * @param {Schedule} schedule
     * @param options
     * @returns {Promise<void>}
     */
    async put(userId, monetaryAccountId, scheduledPaymentId, paymentRequestObject, schedule, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/schedule-payment", "PUT");
        const requestObject = {
            payment: paymentRequestObject,
            schedule: schedule
        };
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment/${scheduledPaymentId}`, requestObject));
        return response.Response;
    }
}
exports.default = SchedulePayment;
