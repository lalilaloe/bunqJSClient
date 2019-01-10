import KeyPair from "../Types/Keypair";
/**
 * Generates a new keypair
 * @param {number} bits
 * @param {number} workers
 * @returns {Promise<object>}
 */
export declare const createKeyPair: (bits?: number, workers?: number) => Promise<any>;
/**
 * @param {KeyPair} keypair
 * @returns {Promise<{publicKey: any; privateKey: any}>}
 */
export declare const keyPairToPem: (keypair: KeyPair) => Promise<{
    publicKey: any;
    privateKey: any;
}>;
/**
 * @param {string} publicKey
 * @returns {Promise<any>}
 */
export declare const publicKeyToPem: (publicKey: any) => Promise<any>;
/**
 * @param {string} privateKey
 * @returns {Promise<any>}
 */
export declare const privateKeyToPem: (privateKey: any) => Promise<any>;
/**
 * @param {string} publicKeyPem
 * @returns {Promise<string>}
 */
export declare const publicKeyFromPem: (publicKeyPem: string) => Promise<any>;
/**
 * @param {string} privateKeyPem
 * @returns {Promise<string>}
 */
export declare const privateKeyFromPem: (privateKeyPem: string) => Promise<any>;
