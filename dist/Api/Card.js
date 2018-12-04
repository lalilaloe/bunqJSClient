"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    async get(userId, cardId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/card/${cardId}`));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {CardListOptions} options
     * @returns {Promise<void>}
     */
    async list(userId, options = {
        count: 25,
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/card`, {}, {
            axiosOptions: {
                params: params
            }
        }));
        return response.Response;
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    async activate(userId, cardId, activationCode, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, { activation_code: activationCode }));
        return response.Response;
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    async setPinCode(userId, cardId, pinCode, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, { pin_code: pinCode }));
        return response.Response;
    }
    /**
 *
 * @param options
 * @returns {Promise<any>}
 */
    async setPinCodeAssignment(userId, cardId, pinCodeAssignment, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, { pin_code_assignment: pinCodeAssignment }));
        return response.Response;
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    async setLimits(userId, cardId, limits, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, { card_limit: limits }));
        return response.Response;
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    async setCountryPermissions(userId, cardId, countryPermissions, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/card/${cardId}`, { country_permission: countryPermissions }));
        return response.Response;
    }
}
exports.default = Card;
