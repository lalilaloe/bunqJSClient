import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import CountryPermissionCollection from "../Types/CountryPermissionCollection";
import LimitCollection from "../Types/LimitCollection";
import PinCodeAssignmentCollection from "../Types/PinCodeAssignmentCollection";

export default class Card implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;

    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }

    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    public async get(userId: number, cardId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "GET");

        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/card/${cardId}`));

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {CardListOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        userId: number,
        options: PaginationOptions = {
            count: 25,
            newer_id: false,
            older_id: false
        }
    ) {
        const params: any = {};

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

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/card`,
                {},
                {
                    axiosOptions: {
                        params: params
                    }
                }
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {string} activationCode
     * @param options
     * @returns {Promise<any>}
     */
    public async activate(userId: number, cardId: number, activationCode: string, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/card/${cardId}`,
                { activation_code: activationCode },
                {},
                { isEncrypted: true }
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {string} pinCode
     * @param options
     * @returns {Promise<any>}
     */
    public async setPinCode(userId: number, cardId: number, pinCode: string, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, { pin_code: pinCode }, {}, { isEncrypted: true })
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {string} pinCodeAssignment
     * @param options
     * @returns {Promise<any>}
     */
    public async setPinCodeAssignment(
        userId: number,
        cardId: number,
        pinCodeAssignment: PinCodeAssignmentCollection,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/card/${cardId}`,
                { pin_code_assignment: pinCodeAssignment },
                {},
                { isEncrypted: true }
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {LimitCollection} limits
     * @param options
     * @returns {Promise<any>}
     */
    public async setLimits(userId: number, cardId: number, limits: LimitCollection, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, { card_limit: limits }, {}, { isEncrypted: true })
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {CountryPermissionCollection} countryPermissions
     * @param options
     * @returns {Promise<any>}
     */
    public async setCountryPermissions(
        userId: number,
        cardId: number,
        countryPermissions: CountryPermissionCollection,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/card/${cardId}`,
                { country_permission: countryPermissions },
                {},
                { isEncrypted: true }
            )
        );

        return response.Response;
    }
}
