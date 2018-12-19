import * as forge from "node-forge";
import BunqJSClient from "../BunqJSClient";
import Session from "../Session";
import LoggerInterface from "../Interfaces/LoggerInterface";
import Request from "./Request";
var crypto = require('crypto');

import ApiAdapterOptions from "../Types/ApiAdapterOptions";

const HEADER_CLIENT_ENCRYPTION_HMAC = "X-Bunq-Client-Encryption-Hmac";
const HEADER_CLIENT_ENCRYPTION_IV = "X-Bunq-Client-Encryption-Iv";
const HEADER_CLIENT_ENCRYPTION_KEY = "X-Bunq-Client-Encryption-Key";
const AES_ENCRYPTION_METHOD = 'aes-256-cbc';
const AES_KEY_LENGTH = 32;
const HMAC_ALGORITHM = 'sha1';
const INITIATION_VECTOR_LENGTH = 16;

export default class EncryptRequestHandler {
    public Session: Session;
    public logger: LoggerInterface;
    public BunqJSClient: BunqJSClient;

    constructor(Session: Session, loggerInterface: LoggerInterface, BunqJSClient: BunqJSClient) {
        this.BunqJSClient = BunqJSClient;
        this.Session = Session;
        this.logger = loggerInterface;
    }

    /**
     * Signs a request using our privatekey
     * @param {Request} request
     * @param {ApiAdapterOptions} options
     * @returns {Promise<string>}
     */
    public async encryptRequest(request: Request, options: ApiAdapterOptions): Promise<void> {
        const body = JSON.stringify(request.requestConfig.data);

        const key = crypto.randomBytes(AES_KEY_LENGTH);
        const iv = crypto.randomBytes(INITIATION_VECTOR_LENGTH);

        const encryptedAesKey = this.encryptPublic(key, this.Session.serverPublicKey);
        const encryptedBody = this.encrypt(body, key, iv);
        const hmacBuffer = this.hmac(key, iv + encryptedBody);

        // set new body
        request.setData(encryptedBody.toString('base64'));

        // disable request transform
        request.setOptions("transformRequest", data => {
            // don't transform the data, return it directly
            return data;
        });

        console.log("Hmac\n")
        console.log(hmacBuffer)
        console.log("IV\n")
        console.log(iv)
        console.log("Key\n")
        console.log(encryptedAesKey)

        // set headers
        request.setHeader("Content-Type", "multipart/form-data");
        request.setHeader(HEADER_CLIENT_ENCRYPTION_HMAC, hmacBuffer);
        request.setHeader(HEADER_CLIENT_ENCRYPTION_IV, iv);
        request.setHeader(HEADER_CLIENT_ENCRYPTION_KEY, encryptedAesKey);
    }

    private hmac(key, content) {
        var hmac = crypto.createHmac(HMAC_ALGORITHM, key);
        hmac.update(content);
        return hmac.digest().getBytes();
    }

    private encrypt(text, key, iv) {
        var cipher = crypto.createCipheriv(AES_ENCRYPTION_METHOD, key, iv)
        var crypted = cipher.update(text)
        crypted += cipher.final('raw');
        return crypted.getBytes();
    }

    private encryptPublic(key, publicKey) {
        const messageDigest = forge.md.sha256.create();
        messageDigest.update(key, 'raw')
        return publicKey.encrypt(messageDigest.digest().getBytes());
    }
}
