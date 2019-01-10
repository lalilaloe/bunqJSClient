/**
 * Returns boolean based on given key validity
 * @param key
 * @returns {Promise<boolean>}
 */
export declare const validateKey: (key: any) => boolean;
/**
 * Encrypt a string with a pre-defined encryption key
 * @param string
 * @param encryptionKey
 * @returns {Promise.<{iv: string, encryptedString: string}>}
 */
export declare const encryptString: (string: any, encryptionKey: any) => Promise<{
    iv: any;
    key: any;
    encryptedString: any;
}>;
/**
 * Decrypts a string using the key and iv
 * @param encryptedString
 * @param key
 * @param iv
 * @returns {Promise.<String>}
 */
export declare const decryptString: (encryptedString: any, key: any, iv: any) => Promise<string>;
