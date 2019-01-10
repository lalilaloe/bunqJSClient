import Amount from "./Amount";
export declare type ShareInviteBankInquiryPostOptions = {
    share_type?: "STANDARD" | "MUTUAL";
    start_date?: Date;
    end_date?: Date;
};
export declare type ShareInviteBankInquiryPostShareDetail = {
    ShareDetailPayment?: ShareInviteBankInquiryPostShareDetailPayment;
    ShareDetailReadOnly?: ShareInviteBankInquiryPostShareDetailReadOnly;
    ShareDetailDraftPayment?: ShareInviteBankInquiryPostShareDetailDraftPayment;
};
export declare type ShareInviteBankInquiryPostShareDetailPayment = {
    make_payments?: boolean;
    make_draft_payments?: boolean;
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
    budget?: ShareInviteBankInquiryPostShareDetailPaymentBudget;
};
export declare type ShareInviteBankInquiryPostShareDetailPaymentBudget = {
    amount: Amount;
    frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
};
export declare type ShareInviteBankInquiryPostShareDetailReadOnly = {
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
};
export declare type ShareInviteBankInquiryPostShareDetailDraftPayment = {
    make_draft_payments?: boolean;
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
};
export declare type ShareInviteBankInquiryPostStatus = "PENDING" | "REVOKED" | "ACCEPTED" | "CANCELLED" | "CANCELLATION_PENDING" | "CANCELLATION_ACCEPTED" | "CANCELLATION_REJECTED";
