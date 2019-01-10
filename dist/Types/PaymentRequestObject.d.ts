import CounterpartyAlias from "./CounterpartyAlias";
import Amount from "./Amount";
export declare type PaymentRequestObject = {
    description: string;
    amount: Amount;
    counterparty_alias: CounterpartyAlias;
    attachment?: any[];
    merchant_reference?: string;
    allow_bunqto?: boolean;
};
export default PaymentRequestObject;
