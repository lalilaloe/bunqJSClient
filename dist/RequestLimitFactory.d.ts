import RequestLimiter from "./RequestLimiter";
export default class RequestLimitFactory {
    private limiters;
    /**
     * @param {string} endpoint
     * @param {string} method
     * @returns {any}
     */
    create(endpoint: string, method?: string): RequestLimiter;
    /**
     * @param {string} endpoint
     * @param {string} method
     * @returns {any}
     */
    getLimiter(endpoint: string, method?: string): any;
    /**
     * @param {string} endpoint
     * @param {string} method
     * @returns {boolean}
     */
    removeLimiter(endpoint: string, method?: string): boolean;
    getAllLimiters(): any;
    clearLimiters(): void;
}
