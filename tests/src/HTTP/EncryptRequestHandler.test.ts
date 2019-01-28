import * as moxios from "moxios";
import EncryptRequestHandler from "../../../src/HTTP/EncryptRequestHandler";
import { privateKeyFromPem, publicKeyFromPem } from "../../../src/Crypto/Rsa";
import BunqJSClient from "../../../src/BunqJSClient";
import SetupApp from "../../TestHelpers/SetupApp";
import Request from "../../../src/HTTP/Request";
import forge = require("node-forge/lib/forge");

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
	let bunqApp: BunqJSClient;
	let handler: EncryptRequestHandler;
	let server_private_key: any;
	let encryption_data: Request;
	let encrypted_body: string;
	let headers: any;
	let iv: string;
	let encrypted_key: string;

	beforeEach(async function () {
		moxios.install();
		bunqApp = await SetupApp();

		server_private_key = await privateKeyFromPem(process.env.CI_SERVER_PRIVATE_KEY_PEM);
		handler = bunqApp.ApiAdapter.EncryptRequestHandler;
		encryption_data = await handler.encryptRequest(request, {});
		encrypted_body = encryption_data.requestConfig.data;
		headers = encryption_data.requestConfig.headers;
		iv = forge.util.decode64(headers[handler.HEADER_CLIENT_ENCRYPTION_IV]);
		encrypted_key = forge.util.decode64(headers[handler.HEADER_CLIENT_ENCRYPTION_KEY]);
	});

	afterEach(function () {
		moxios.uninstall();
	});
	it("allows decryption using server private key", async () => {
		expect(server_private_key).toBeDefined();
		expect(encryption_data).toBeDefined();
		expect(encrypted_body).toBeDefined();
		expect(iv).toBeDefined();
		expect(encrypted_key).toBeDefined();

		const key = server_private_key.decrypt(encrypted_key);
		expect(key).toBeDefined();

		var data = forge.util.createBuffer(encrypted_body);
		var decipher = forge.cipher.createDecipher('AES-CBC', key);
		decipher.start({ iv: iv });
		decipher.update(data);
		decipher.finish();
		var decrypted = JSON.parse(decipher.output.data);
		expect(decrypted).toEqual(body);
	});

	it("returns a valid HMAC", async () => {
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
