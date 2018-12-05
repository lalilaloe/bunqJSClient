import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import CountryPermissionCollection from "../Types/CountryPermissionCollection";
import LimitCollection from "../Types/LimitCollection";
import PinCodeAssignmentCollection from "../Types/PinCodeAssignmentCollection";
import Amount from "../Types/Amount";
import Limit from "../Types/Limit";
import MagStripePermission from "../Types/MagStripePermission";

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
                {
                    activation_code: activationCode,
                    status: "ACTIVE"
                },
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
     * @param {PinCodeAssignmentCollection} pinCodeAssignment
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
    public async put(
        userId: number,
        cardId: number,
        pinCode: string,
        activationCode: string,
        status: string,
        cardLimit: Amount,
        limits: LimitCollection,
        magStripePermission: MagStripePermission,
        countryPermissions: CountryPermissionCollection,
        pinCodeAssignment: PinCodeAssignmentCollection,
        monetaryAccountIdFallback: number = 0,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/card/${cardId}`,
                {
                    pin_code: pinCode,
                    activation_code: activationCode,
                    status: status,
                    card_limit: cardLimit,
                    limit: limits,
                    mag_stripe_permission: magStripePermission,
                    country_permission: countryPermissions,
                    pin_code_assignment: pinCodeAssignment,
                    monetary_account_id_fallback: monetaryAccountIdFallback
                },
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
