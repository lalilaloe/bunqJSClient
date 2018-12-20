import * as moxios from "moxios";
import EncryptRequestHandler from "../../../src/HTTP/EncryptRequestHandler";
import { privateKeyFromPem, publicKeyFromPem } from "../../../src/Crypto/Rsa";
import BunqJSClient from "../../../src/BunqJSClient";
import SetupApp from "../../TestHelpers/SetupApp";
import Request from "../../../src/HTTP/Request";
import forge = require("node-forge/lib/forge");
const crypto = require("crypto");

const request = new Request(
    "/test",
    "GET",
    { amount: 10 },
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
            let server_public_key = bunqApp.ApiAdapter.Session.publicKey;
            let handler = bunqApp.ApiAdapter.EncryptRequestHandler;
            let encryption_data = await handler.encryptRequest(request, {});
            let encrypted_body = encryption_data.requestConfig.data;
            let iv = forge.util.decode64(encryption_data.requestConfig.headers[handler.HEADER_CLIENT_ENCRYPTION_IV]);
            let encrypted_key = forge.util.decode64(encryption_data.requestConfig.headers[handler.HEADER_CLIENT_ENCRYPTION_KEY]);

            expect(server_private_key).toBeDefined();
            expect(encryption_data).toBeDefined();
            expect(encrypted_body).toBeDefined();
            expect(iv).toBeDefined();
            expect(encrypted_key).toBeDefined();
            // let random = forge.random.getBytesSync(handler.AES_KEY_LENGTH)
            // let crypted_key = server_public_key.encrypt(random)
            // console.log(random.toString())
            // console.log(crypted_key)
            // const test_key = server_private_key.decrypt(crypted_key);
            // console.log("key");
            // console.log(test_key);
            // const messageDigest = forge.md.sha256.create();
            // messageDigest.update(encrypted_key, "raw");

            // const key = server_private_key.decrypt(messageDigest.digest().getBytes());
            const key = server_private_key.decrypt(encrypted_key);
            expect(key).toBeDefined();

            var decipher = crypto.createDecipheriv(EncryptRequestHandler.prototype.AES_ENCRYPTION_METHOD, key, iv);
            var decrypted = decipher.update(encrypted_body);
            decrypted += decipher.final("raw");
            var result = decrypted.getBytes();
            expect(decrypted).toBe(request.requestConfig.data);
        });

        // it("returns a valid HMAC", async () => {
        //     const bunqApp: BunqJSClient = await SetupApp();
        //     //expect.assertions(1);
        //     let server_private_key = await privateKeyFromPem(process.env.CI_PRIVATE_KEY_PEM);
        //     let handler = bunqApp.ApiAdapter.EncryptRequestHandler;
        //     let encryption_data = await handler.encryptRequest(request, {});
        //     let encrypted_body = encryption_data.requestConfig.data;
        //     let iv = forge.util.decode64(encryption_data.requestConfig.headers[handler.HEADER_CLIENT_ENCRYPTION_IV]);
        //     let encrypted_key = forge.util.decode64(encryption_data.requestConfig.headers[handler.HEADER_CLIENT_ENCRYPTION_KEY]);
        //     let hmac = forge.util.decode64(encryption_data.requestConfig.headers[handler.HEADER_CLIENT_ENCRYPTION_HMAC]);

        //     expect(server_private_key).toBeDefined();
        //     expect(encryption_data).toBeDefined();
        //     expect(encrypted_body).toBeDefined();
        //     expect(iv).toBeDefined();
        //     expect(encrypted_key).toBeDefined();
        //     expect(hmac).toBeDefined();
        //     const key = server_private_key.decrypt(encrypted_key);
        //     console.log("key");
        //     expect(key).toBeDefined();

        //     var test_hmac = crypto.createHmac(EncryptRequestHandler.prototype.HMAC_ALGORITHM, key);
        //     test_hmac.update(iv + encrypted_body);

        //     expect(test_hmac.digest()).toBe(hmac);
        // });
    });
});
