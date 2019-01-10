import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PinCodeAssignmentCollection from "../Types/PinCodeAssignmentCollection";
import CounterpartyAlias from "../Types/CounterpartyAlias";
import CardType from "../Types/CardType";
export default class CardDebit implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter);
    /**
     * @param {number} userId
     * @param {string} name
     * @param {string} description
     * @param {CounterpartyAlias} alias
     * @param {CardType} cardType
     * @param {PinCodeAssignmentCollection} assignments
     * @param options
     * @returns {Promise<any>}
     */
    post(userId: number, name: string, description: string, alias: CounterpartyAlias, cardType: CardType, assignments: PinCodeAssignmentCollection, options?: any): Promise<any>;
}
