import BunqJSClient from "../../src/BunqJSClient";

import Prepare from "./Prepare";
import CustomDb from "./CustomDb";
import { randomHex } from "./RandomData";
import { UserInfo } from "../TestData/api-session-registration";
import { privateKeyFromPem, publicKeyFromPem } from "../../src/Crypto/Rsa";

const FAKE_API_KEY = randomHex(64);
const FAKE_ENCRYPTION_KEY = randomHex(32);

/**
 * Create a default app to use in tests
 * @param {string} apiKey
 * @param {string} dbName
 * @param {Array} runOptions
 * @returns {Promise<BunqJSClient>}
 */
export default async (setupName: string | false = false, apiKey: string = FAKE_API_KEY): Promise<BunqJSClient> => {
    Prepare();

    const dbName: string = setupName || randomHex(32);

    const app = new BunqJSClient(new CustomDb(dbName));
    await app.run(apiKey, [], "SANDBOX", FAKE_ENCRYPTION_KEY);

    // setup
    app.Session.apiKey = apiKey;
    app.Session.allowedIps = [];
    app.Session.environmentType = "SANDBOX";
    app.Session.encryptionKey = FAKE_ENCRYPTION_KEY;

    app.Session.publicKeyPem = process.env.CI_PUBLIC_KEY_PEM;
    app.Session.privateKeyPem = process.env.CI_PRIVATE_KEY_PEM;
    app.Session.publicKey = await publicKeyFromPem(app.Session.publicKeyPem);
    app.Session.privateKey = await privateKeyFromPem(app.Session.privateKeyPem);

    // installation
    app.Session.serverPublicKeyPem = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzFDA/4F0+vZYt44hleIb
    Syji8VhwKhwVehKFEZWsbM3/AC8ue6FWC0xgqmQNt+/HOVz86qEFAUKpc0GphrxL
    7AMvu6Cytp3JfwexQdAWjoU9zYdzAcmOguPqmifnae+JDGpnW+WHyzz7aD27Nzb5
    N82Dj7PTHhm2T5sb5lo5K3UBRXufpzSAgmcz84OkphSoE7xJX9nck0vTLdDbReMV
    Fs/lzMaqT7d1kFCdcZmy3f0N9ElTSLbz+iOuhH/F3sLNifKdWCwpeJwi3QR/w77z
    nMa/MHcIsFCScpemIDJn5LyjTOgY9sbVeTw7F7/wM5BF2ndRCGIxkLkzFHeZJZp4
    SwIDAQAB
    -----END PUBLIC KEY-----`;
    app.Session.serverPublicKey = await publicKeyFromPem(app.Session.serverPublicKeyPem);
    app.Session.installToken = "a4f9d888eea84f52722b9baf2f17c289d549edf6e0eccdbf868eb922be306fb6";
    app.Session.installUpdated = new Date();
    app.Session.installCreated = new Date();

    // device registration
    app.Session.deviceId = 123123;

    // session registration
    app.Session.sessionExpiryTime = new Date();
    app.Session.sessionTimeout = 300;
    app.Session.sessionId = 42;
    app.Session.sessionToken = "a4f9d888eea84f52722b9baf2f17c289d549edf6e0eccdbf868eb922be306fb6";
    app.Session.sessionTokenId = 839;
    app.Session.userInfo = {
        UserCompany: UserInfo,
        UserPerson: UserInfo,
        UserLight: UserInfo
    };

    return app;
};
