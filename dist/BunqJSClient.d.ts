import ApiAdapter from "./ApiAdapter";
import Session from "./Session";
import StorageInteface from "./Interfaces/StorageInterface";
import LoggerInterface from "./Interfaces/LoggerInterface";
import ApiEndpointCollection from "./Interfaces/ApiEndpointCollection";
export default class BunqJSClient {
    storageInterface: StorageInteface;
    logger: LoggerInterface;
    apiKey: string;
    Session: Session;
    ApiAdapter: ApiAdapter;
    /**
     * Decides whether the session is kept alive (which will be slightly faster)
     * or creates a new session when required
     * @type {boolean}
     */
    keepAlive: boolean;
    /**
     * Contains the promise for fetching a new session to prevent duplicate requests
     * @type {boolean}
     */
    fetchingNewSession: Promise<boolean> | false;
    /**
     * Contains object with all API endpoints
     */
    api: ApiEndpointCollection;
    /**
     * A list of all custom bunqJSClient error codes to make error handling easier
     * @type {{INSTALLATION_HAS_SESSION}}
     */
    errorCodes: any;
    /**
     * @param {StorageInterface} storageInterface
     * @param {LoggerInterface} loggerInterface
     */
    constructor(storageInterface?: StorageInteface, loggerInterface?: LoggerInterface);
    /**
     * Starts the client and sets up the required components
     * @returns {Promise.<void>}
     */
    run(apiKey: string, allowedIps?: string[], environment?: string, encryptionKey?: string | boolean): Promise<void>;
    /**
     * If true, polling requests will be sent to try and keep the current session
     * alive instead of creating a new session when required
     * If false, a new session will be created when required
     * @param {boolean} keepAlive
     */
    setKeepAlive(keepAlive: boolean): void;
    /**
     * Installs this application
     * @returns {Promise<boolean>}
     */
    install(): Promise<boolean>;
    /**
     * Registers a new device for this installation
     * @param {string} deviceName
     * @returns {Promise<boolean>}
     */
    registerDevice(deviceName?: string): Promise<boolean>;
    /**
     * Registers a new session when required for this device and installation
     * @returns {Promise<boolean>}
     */
    registerSession(): Promise<boolean>;
    /**
     * Send the actual request and handle it
     * @returns {Promise<boolean>}
     */
    private generateSession;
    /**
     * Change the encryption key and
     * @param {string} encryptionKey
     * @returns {Promise<boolean>}
     */
    changeEncryptionKey(encryptionKey: string): Promise<boolean>;
    /**
     * Handles the oauth type users
     * @param userInfoParsed
     * @returns {any}
     */
    private parseOauthUser;
    /**
     * Create a new credential password ip
     * @returns {Promise<any>}
     */
    createCredentials(): Promise<any>;
    /**
     * Check if a credential password ip has been accepted
     * @param {string} uuid
     * @returns {Promise<any>}
     */
    checkCredentialStatus(uuid: string): Promise<any>;
    /**
     *
     * @param {string} clientId
     * @param {string} clientSecret
     * @param {string} redirectUri
     * @param {string} code
     * @param {string|false} state
     * @param {boolean} sandbox
     * @param {string} grantType
     * @returns {Promise<string>}
     */
    exchangeOAuthToken(clientId: string, clientSecret: string, redirectUri: string, code: string, state?: string | false, sandbox?: boolean, grantType?: string): Promise<string>;
    /**
     * Formats a correct bunq OAuth url to begin the login flow
     * @param {string} clientId
     * @param {string} redirectUri
     * @param {string|false} state
     * @param {boolean} sandbox
     * @returns {string}
     */
    formatOAuthAuthorizationRequestUrl(clientId: string, redirectUri: string, state?: string | false, sandbox?: boolean): string;
    /**
     * Formats the given parameters into the url used for the token exchange
     * @param {string} clientId
     * @param {string} clientSecret
     * @param {string} redirectUri
     * @param {string} code
     * @param {boolean} sandbox
     * @param {string} grantType
     * @returns {string}
     */
    formatOAuthKeyExchangeUrl(clientId: string, clientSecret: string, redirectUri: string, code: string, sandbox?: boolean, grantType?: string): string;
    /**
     * Sets an automatic timer to keep the session alive when possible
     */
    setExpiryTimer(shortTimeout?: boolean): boolean;
    /**
     * Resets the session expiry timer
     */
    clearExpiryTimer(): void;
    /**
     * Handles the expiry timer checker callback
     */
    private expiryTimerCallback;
    /**
     * Calculate in how many milliseconds the session will expire
     * @param {boolean} shortTimeout
     * @returns {number}
     */
    calculateSessionExpiry(shortTimeout?: boolean): number;
    /**
     * Destroys the current installation and session and all variables associated with it
     * @returns {Promise<void>}
     */
    destroySession(): Promise<void>;
    /**
     * Destroys the current session and all variables associated with it
     * @returns {Promise<void>}
     */
    destroyApiSession(): Promise<void>;
    /**
     * Returns the registered user for the session of a specific type
     * @returns {any}
     */
    getUser(userType: any, updated?: boolean): Promise<any>;
    /**
     * Returns the registered users for the session
     * @returns {any}
     */
    getUsers(updated?: boolean): Promise<any>;
    /**
     * Receives an object with an unknown user type and returns an object with
     * the correct info and a isOAuth boolean
     * @param userInfo
     * @returns {{info: any; isOAuth: boolean}}
     */
    private getUserType;
}
