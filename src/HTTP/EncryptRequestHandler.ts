import * as forge from "node-forge";
import BunqJSClient from "../BunqJSClient";
import Session from "../Session";
import LoggerInterface from "../Interfaces/LoggerInterface";
import Request from "./Request";
import { encryptString } from "../Crypto/Sha256";
const crypto = require("crypto");

import ApiAdapterOptions from "../Types/ApiAdapterOptions";

export default class EncryptRequestHandler {
    HEADER_CLIENT_ENCRYPTION_HMAC = "X-Bunq-Client-Encryption-Hmac";
    HEADER_CLIENT_ENCRYPTION_IV = "X-Bunq-Client-Encryption-Iv";
    HEADER_CLIENT_ENCRYPTION_KEY = "X-Bunq-Client-Encryption-Key";
    AES_ENCRYPTION_METHOD = "aes-256-cbc";
    AES_KEY_LENGTH = 32;
    HMAC_ALGORITHM = "sha1";
    INITIATION_VECTOR_LENGTH = 16;

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
    public async encryptRequest(request: Request, options: ApiAdapterOptions): Promise<Request> {
        const body = JSON.stringify(request.requestConfig.data);

        const key = crypto.randomBytes(this.AES_KEY_LENGTH);
        const iv = crypto.randomBytes(this.INITIATION_VECTOR_LENGTH);

        const encryptedAesKey = this.encryptPublic(key, this.Session.serverPublicKey);
        const encryptedBody = this.encrypt(body, key, iv);
        const hmacBuffer = this.hmac(key, iv + encryptedBody);

        // set new body
        request.setData(encryptedBody);

        // disable request transform
        request.setOptions("transformRequest", data => {
            // don't transform the data, return it directly
            return data;
        });

        // set headers
        request.setHeader("Content-Type", "multipart/form-data");
        request.setHeader(this.HEADER_CLIENT_ENCRYPTION_HMAC, hmacBuffer);
        request.setHeader(this.HEADER_CLIENT_ENCRYPTION_IV, iv.toString("base64"));
        request.setHeader(this.HEADER_CLIENT_ENCRYPTION_KEY, forge.util.encode64(encryptedAesKey));

        return request;
    }

    private hmac(key, content) {
        var hmac = crypto.createHmac(this.HMAC_ALGORITHM, key);
        hmac.update(content);
        return hmac.digest("base64");
    }

    private encrypt(text, key, iv) {
        var cipher = crypto.createCipheriv(this.AES_ENCRYPTION_METHOD, key, iv);
        cipher.update(text);
        return cipher.final();
    }

    private encryptPublic(key, publicKey) {
        const messageDigest = forge.md.sha256.create();
        messageDigest.update(key, "raw");
        return publicKey.encrypt(messageDigest.digest().getBytes());
    }
}
