import * as moxios from "moxios";
import EncryptRequestHandler from "../../../src/HTTP/EncryptRequestHandler";
import { privateKeyFromPem, publicKeyFromPem } from "../../../src/Crypto/Rsa";
import BunqJSClient from "../../../src/BunqJSClient";
import SetupApp from "../../TestHelpers/SetupApp";
import Request from "../../../src/HTTP/Request";
import forge = require("node-forge/lib/forge");
const crypto = require("crypto");

const body = { amount: 10 };
const request = new Request(
    "/test",
    "GET",
    body,
    {
        "Content-Type": "test"
    },
    {
        random: 1
    }
);

describe("EncryptRequest", () => {
    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    describe("#encrypt", () => {
        it("allows decryption using server private key", async () => {
            const bunqApp: BunqJSClient = await SetupApp();
            //expect.assertions(1);

            let server_private_key = bunqApp.ApiAdapter.Session.privateKey;
            let handler = bunqApp.ApiAdapter.EncryptRequestHandler;
            let encryption_data = await handler.encryptRequest(request, {});
            let encrypted_body = encryption_data.requestConfig.data;
            let headers = encryption_data.requestConfig.headers;
            let iv = forge.util.decode64(headers[handler.HEADER_CLIENT_ENCRYPTION_IV]);
            let encrypted_key = forge.util.decode64(headers[handler.HEADER_CLIENT_ENCRYPTION_KEY]);


            expect(server_private_key).toBeDefined();
            expect(encryption_data).toBeDefined();
            expect(encrypted_body).toBeDefined();
            expect(iv).toBeDefined();
            expect(encrypted_key).toBeDefined();

            const key = server_private_key.decrypt(encrypted_key);
            expect(key).toBeDefined();

            var data = forge.util.createBuffer(forge.util.hexToBytes(encrypted_body));
            var decipher = forge.cipher.createDecipher('AES-CBC', key);
            decipher.start({ iv: iv });
            decipher.update(data);
            decipher.finish();
            var decrypted = JSON.parse(decipher.output.data);
            expect(decrypted).toEqual(body);
        });

        it("returns a valid HMAC", async () => {
            const bunqApp: BunqJSClient = await SetupApp();
            //expect.assertions(1);

            let server_private_key = bunqApp.ApiAdapter.Session.privateKey;
            let handler = bunqApp.ApiAdapter.EncryptRequestHandler;
            let encryption_data = await handler.encryptRequest(request, {});
            let encrypted_body = encryption_data.requestConfig.data;
            let headers = encryption_data.requestConfig.headers;
            let iv = forge.util.decode64(headers[handler.HEADER_CLIENT_ENCRYPTION_IV]);
            let encrypted_key = forge.util.decode64(headers[handler.HEADER_CLIENT_ENCRYPTION_KEY]);

            let hmac = forge.util.decode64(encryption_data.requestConfig.headers[handler.HEADER_CLIENT_ENCRYPTION_HMAC]);

            expect(server_private_key).toBeDefined();
            expect(encryption_data).toBeDefined();
            expect(encrypted_body).toBeDefined();
            expect(iv).toBeDefined();
            expect(encrypted_key).toBeDefined();

            const key = server_private_key.decrypt(encrypted_key);
            expect(key).toBeDefined();

            let test_hmac = handler.hmac(key, iv + encrypted_body)

            expect(hmac).toEqual(test_hmac);
        });
    });
});
