declare class CustomError extends Error {
    name: string;
    response: string | false;
    errorCode: string | false;
    constructor(error: any, response?: false | any, errorCode?: false | string);
}
export default CustomError;
