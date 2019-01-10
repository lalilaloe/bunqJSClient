/**
 * Hashes a string using sha256
 * @param {string} string
 * @returns {Promise<string>}
 */
export declare const stringToHash: (string: string) => Promise<any>;
/**
 * Encrypts a string using a publicKey
 * @param {string} data
 * @param publicKey
 * @returns {Promise<string>}
 */
export declare const encryptString: (data: string, publicKey: any) => Promise<any>;
/**
 * Signs a string using a privateKey
 * @param {string} data
 * @param privateKey
 * @returns {Promise<string>}
 */
export declare const signString: (data: string, privateKey: any) => Promise<any>;
/**
 * Verifies if a string was signed by a public key
 * @param {string} data
 * @param publicKey
 * @param {string} signature
 * @returns {Promise<string>}
 */
export declare const verifyString: (data: string, publicKey: any, signature: string) => Promise<any>;
