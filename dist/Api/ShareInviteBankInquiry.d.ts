import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import CounterpartyAlias from "../Types/CounterpartyAlias";
import { ShareInviteBankInquiryPostOptions, ShareInviteBankInquiryPostShareDetail, ShareInviteBankInquiryPostStatus } from "../Types/ShareInviteBankInquiry";
export default class ShareInviteBankInquiry implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    get(userId: number, accountId: number, shareInviteBankInquiryId: number, options?: PaginationOptions): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    list(userId: number, accountId: number, options?: PaginationOptions): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {ShareInviteBankInquiryPostShareDetail} shareDetail
     * @param {ShareInviteBankInquiryPostStatus} status
     * @param {ShareInviteBankInquiryPostOptions} options
     * @returns {Promise<any>}
     */
    post(userId: number, monetaryAccountId: number, counterpartyAlias: CounterpartyAlias, shareDetail: ShareInviteBankInquiryPostShareDetail, status?: ShareInviteBankInquiryPostStatus, options?: ShareInviteBankInquiryPostOptions): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {ShareInviteBankInquiryPostShareDetail} shareDetail
     * @param {ShareInviteBankInquiryPostStatus} status
     * @param {ShareInviteBankInquiryPostOptions} options
     * @returns {Promise<any>}
     */
    put(userId: number, monetaryAccountId: number, shareInviteBankInquiryId: number, counterpartyAlias: CounterpartyAlias, shareDetail: ShareInviteBankInquiryPostShareDetail, status?: ShareInviteBankInquiryPostStatus, options?: ShareInviteBankInquiryPostOptions): Promise<any>;
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} shareInviteBankInquiryId
     * @param {ShareInviteBankInquiryPostStatus} status
     * @returns {Promise<any>}
     */
    putStatus(userId: number, monetaryAccountId: number, shareInviteBankInquiryId: number, status: ShareInviteBankInquiryPostStatus): Promise<any>;
}
