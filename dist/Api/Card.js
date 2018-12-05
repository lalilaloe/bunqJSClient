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
     * @param {number} userId
     * @param {number} cardId
     * @param {string} activationCode
     * @param options
     * @returns {Promise<any>}
     */
    async activate(userId, cardId, activationCode, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, {
            activation_code: activationCode,
            status: "ACTIVE"
        }, {}, { isEncrypted: true }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {string} pinCode
     * @param options
     * @returns {Promise<any>}
     */
    async setPinCode(userId, cardId, pinCode, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, { pin_code: pinCode }, {}, { isEncrypted: true }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {PinCodeAssignmentCollection} pinCodeAssignment
     * @param options
     * @returns {Promise<any>}
     */
    async setPinCodeAssignment(userId, cardId, pinCodeAssignment, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, { pin_code_assignment: pinCodeAssignment }, {}, { isEncrypted: true }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {string} pinCode
     * @param {string} activationCode
     * @param {string} status
     * @param {Amount} cardLimit
     * @param {Limit} limits
     * @param {MagStripePermission} magStripePermission
     * @param {CountryPermissionCollection} countryPermissions
     * @param {PinCodeAssignmentCollection} pinCodeAssignment
     * @param {number} monetaryAccountIdFallback
     * @param options
     * @returns {Promise<any>}
     */
    async put(userId, cardId, pinCode, activationCode, status, cardLimit, limits, magStripePermission, countryPermissions, pinCodeAssignment, monetaryAccountIdFallback = 0, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, {
            "pin_code": pinCode,
            "activation_code": activationCode,
            "status": status,
            "card_limit": cardLimit,
            "limit": limits,
            "mag_stripe_permission": magStripePermission,
            "country_permission": countryPermissions,
            "pin_code_assignment": pinCodeAssignment,
            "monetary_account_id_fallback": monetaryAccountIdFallback
        }, {}, { isEncrypted: true }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {LimitCollection} limits
     * @param options
     * @returns {Promise<any>}
     */
    async setLimits(userId, cardId, limits, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, { card_limit: limits }, {}, { isEncrypted: true }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {CountryPermissionCollection} countryPermissions
     * @param options
     * @returns {Promise<any>}
     */
    async setCountryPermissions(userId, cardId, countryPermissions, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, { country_permission: countryPermissions }, {}, { isEncrypted: true }));
        return response.Response;
    }
}
exports.default = Card;
