import StorageInterface from "./Interfaces/StorageInterface";
import LoggerInterface from "./Interfaces/LoggerInterface";
declare type UrlEnviromentType = {
    [key: string]: string;
};
export declare const ALLOWED_ENVIROMENTS: string[];
export declare const URL_ENVIROMENTS: UrlEnviromentType;
export default class Session {
    storageInterface: StorageInterface;
    logger: LoggerInterface;
    apiKey: string | boolean;
    apiKeyIdentifier: string | boolean;
    encryptionKey: string | boolean;
    allowedIps: string[];
    isOAuthKey: boolean;
    environment: string;
    environmentUrl: string;
    publicKey: any;
    publicKeyPem: string;
    privateKey: any;
    privateKeyPem: string;
    serverPublicKey: string;
    serverPublicKeyPem: string;
    installCreated?: Date;
    installUpdated?: Date;
    installToken: string;
    deviceId: number;
    sessionToken: string;
    sessionTokenId: string | number;
    sessionId: number;
    sessionExpiryTime?: Date;
    sessionTimeout: number;
    sessionExpiryTimeChecker?: any;
    userInfo: any;
    storageKeyLocation: string;
    storageIvLocation: string;
    constructor(storageInterface: StorageInterface, loggerInterface: LoggerInterface);
    /**
     * Checks default values and looks in storage interface
     * @param {{forceNewKeypair: boolean}} options
     * @returns {Promise<void>}
     */
    setup(apiKey: string | boolean, allowedIps?: string[], environment?: string, encryptionKey?: string | boolean): Promise<boolean>;
    /**
     * Updates the encryption key and stores data using that new key
     * @param {string} encryptionKey
     * @returns {Promise<boolean>}
     */
    setEncryptionKey(encryptionKey: string): Promise<boolean>;
    /**
     * Setup the keypair and generate a new one when required
     * @param {boolean} forceNewKeypair
     * @param {boolean} ignoreCI - if true the hardcoded certs won't be used even if process.env.CI is set
     * @returns {Promise<boolean>}
     */
    setupKeypair(forceNewKeypair?: boolean, bitSize?: number, ignoreCI?: boolean): Promise<boolean>;
    /**
     * Checks if a session is stored and verifies/loads it into this instance
     * @returns {Promise.<boolean>}
     */
    loadSession(): Promise<boolean>;
    /**
     * Stores this session using the storageInterface
     * @returns {Promise.<void>}
     */
    storeSession(): Promise<boolean>;
    /**
     * Resets all values to default and remove data from storage
     * @returns {Promise<void>}
     */
    destroySession(): Promise<any>;
    /**
     * Removes info from the object, keeps stored data in
     * @param {boolean} save
     * @returns {Promise<boolean>}
     */
    destroyInstallationMemory(): Promise<void>;
    /**
     * Destroys only the data associated with the api session
     * @param {boolean} save
     * @returns {Promise<undefined>}
     */
    destroyApiSession(save?: boolean): Promise<boolean>;
    /**
     * Destroys only the data associated with the installation
     * @param {boolean} save
     * @returns {Promise<undefined>}
     */
    destroyApiInstallation(save?: boolean): Promise<boolean>;
    /**
     * Destroys only the data associated with the device installation
     * @param {boolean} save
     * @returns {Promise<undefined>}
     */
    destroyApiDeviceInstallation(save?: boolean): Promise<boolean>;
    /**
     * Attempt to decrypt the session data with our stored IV and encryption key
     * @param encryptedSession
     * @returns {Promise<any>}
     */
    private decryptSession;
    /**
     * Attempt to encrypt the session data with encryption key
     * @param sessionData
     * @returns {Promise<boolean>}
     */
    private encryptSession;
    /**
     * @param data
     * @param {string} data_location
     * @param {string} iv_location
     * @returns {Promise<boolean>}
     */
    storeEncryptedData(data: any, location: string): Promise<boolean>;
    /**
     * @param {string} data_location
     * @param {string} iv_location
     * @returns {Promise<any>}
     */
    loadEncryptedData(data_location: string, iv_location?: string): Promise<any>;
    /**
     * Wrapper around the storage interface for remove calls
     * @param key
     * @param {boolean} silent
     * @returns {Promise<any>}
     */
    asyncStorageRemove(key: string, silent?: boolean): Promise<any>;
    /**
     * Wrapper around the storage interface for get calls
     * @param key
     * @param {boolean} silent
     * @returns {Promise<any>}
     */
    asyncStorageGet(key: string, silent?: boolean): Promise<any>;
    /**
     * Wrapper around the storage interface for set calls
     * @param key
     * @param value
     * @param {boolean} silent
     * @returns {Promise<any>}
     */
    asyncStorageSet(key: string, value: any, silent?: boolean): Promise<any>;
    /**
     * Checks if this session has a succesful installation stored
     * @returns {boolean}
     */
    verifyInstallation(): boolean;
    /**
     * Checks if this session has a succesful device installation stored
     * @returns {boolean}
     */
    verifyDeviceInstallation(): boolean;
    /**
     * Checks if this session has a succesful session setup
     * @returns {boolean}
     */
    verifySessionInstallation(): boolean;
    /**
     * Checks if session has expired yet
     * @returns {boolean}
     */
    verifySessionExpiry(): boolean;
    /**
     * Set enviroment and check if type is allowed/valid
     * @param environmentType
     */
    environmentType: string;
}
export {};
