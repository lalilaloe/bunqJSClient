import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import CountryPermissionCollection from "../Types/CountryPermissionCollection";
import LimitCollection from "../Types/LimitCollection";
import PinCodeAssignmentCollection from "../Types/PinCodeAssignmentCollection";
import Amount from "../Types/Amount";
import MagStripePermission from "../Types/MagStripePermission";
export default class Card implements ApiEndpointInterface {
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
    get(userId: number, cardId: number, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {CardListOptions} options
     * @returns {Promise<void>}
     */
    list(userId: number, options?: PaginationOptions): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {string} activationCode
     * @param options
     * @returns {Promise<any>}
     */
    activate(userId: number, cardId: number, activationCode: string, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {string} pinCode
     * @param options
     * @returns {Promise<any>}
     */
    setPinCode(userId: number, cardId: number, pinCode: string, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {PinCodeAssignmentCollection} pinCodeAssignment
     * @param options
     * @returns {Promise<any>}
     */
    setPinCodeAssignment(userId: number, cardId: number, pinCodeAssignment: PinCodeAssignmentCollection, options?: any): Promise<any>;
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
    put(userId: number, cardId: number, pinCode: string, activationCode: string, status: string, cardLimit: Amount, limits: LimitCollection, magStripePermission: MagStripePermission, countryPermissions: CountryPermissionCollection, pinCodeAssignment: PinCodeAssignmentCollection, monetaryAccountIdFallback?: number, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {LimitCollection} limits
     * @param options
     * @returns {Promise<any>}
     */
    setLimits(userId: number, cardId: number, limits: LimitCollection, options?: any): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {CountryPermissionCollection} countryPermissions
     * @param options
     * @returns {Promise<any>}
     */
    setCountryPermissions(userId: number, cardId: number, countryPermissions: CountryPermissionCollection, options?: any): Promise<any>;
}
