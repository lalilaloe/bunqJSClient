import Amount from "./Amount";
import AddressDetails from "./AddressDetails";
declare type RequestResponsePutOptions = {
    amount_responded?: Amount;
    address_shipping?: AddressDetails;
    address_billing?: AddressDetails;
};
export default RequestResponsePutOptions;
