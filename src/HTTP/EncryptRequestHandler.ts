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

        const key = forge.random.getBytesSync(this.AES_KEY_LENGTH);
        const iv = forge.random.getBytesSync(this.INITIATION_VECTOR_LENGTH);

        const encryptedAesKey = this.encryptPublic(key, this.Session.publicKey);
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
        request.setHeader(this.HEADER_CLIENT_ENCRYPTION_HMAC, forge.util.encode64(hmacBuffer));
        request.setHeader(this.HEADER_CLIENT_ENCRYPTION_IV, forge.util.encode64(iv));
        request.setHeader(this.HEADER_CLIENT_ENCRYPTION_KEY, forge.util.encode64(encryptedAesKey));

        return request;
    }

    public hmac(key, content) {
        const hmac = forge.hmac.create();
        hmac.start(this.HMAC_ALGORITHM, key);
        hmac.update(content);
        return hmac.digest().data;
    }

    private encrypt(text, key, iv) {
        var cipher = forge.cipher.createCipher('AES-CBC', key);

        cipher.start({ iv: iv });
        cipher.update(forge.util.createBuffer(text));
        cipher.finish();

        var encrypted = cipher.output;
        var data = forge.util.bytesToHex(encrypted);
        return data;
    }

    private encryptPublic(key, publicKey) {
        return publicKey.encrypt(key);
    }
}
