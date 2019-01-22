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
const SERVER_PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAzFDA/4F0+vZYt44hleIbSyji8VhwKhwVehKFEZWsbM3/AC8u
e6FWC0xgqmQNt+/HOVz86qEFAUKpc0GphrxL7AMvu6Cytp3JfwexQdAWjoU9zYdz
AcmOguPqmifnae+JDGpnW+WHyzz7aD27Nzb5N82Dj7PTHhm2T5sb5lo5K3UBRXuf
pzSAgmcz84OkphSoE7xJX9nck0vTLdDbReMVFs/lzMaqT7d1kFCdcZmy3f0N9ElT
SLbz+iOuhH/F3sLNifKdWCwpeJwi3QR/w77znMa/MHcIsFCScpemIDJn5LyjTOgY
9sbVeTw7F7/wM5BF2ndRCGIxkLkzFHeZJZp4SwIDAQABAoIBAQC1q2RAjDqY36y4
4b9JR3gfV2abVJi/SKNsHMWHgj+Dq5L+9fTt5uHcP/h/6WEtWR4bCmy0r6IEoeKL
4im77PfRDnBF9DiUGi7NLejV7RHxfdYbR0Hip/Z4ufGjSrIAxwVkLcRjuO8KrtmY
sbMjAFWO4cUGZM3mqNQram7fXwAQe2u/K9j/KN0yLb0f1TPNUeMN9YvodDrzRty7
igldUp1GFdKez7s05S07QYBtII/2PMjSv240RuEoaf3WUBslpGL2/QKhReo/vUOq
X4DI5xDMW6yag6U+kG86+RycoFmOIs+GYa++ggGzGLmLXCeVk2XClUvTXq7/J3BZ
eT3rpG3pAoGBAPsP65606DshxU1iz44EGiEghZn//YDO+MppYj2uLYRpNhaIBSCE
t9x1ybXJ27V+SOCPnYVGD6W2mpfD+/NROuPbGecjAXLbhydp0/G78hatpE/1Teej
ywwQ3G3Z55SLbAPrTlYExy6mieq7o2K6tOsSgqzO5a9aMMIo1Yvt2sQ9AoGBANBV
d5PF7HbiH8nWDl934XnYl9Sh6SCiIjEJiExU4rpnvtcrQ/8B3wOGYi4LGe2v2Tlk
lQbRq4DtpkIP+TRZXn3rEUU4S/eIPR/ulk600cD99q3ih0ms7uYq3ly3dGfWo96E
rKEfMjPLEpcxq8S3efUwvE6Jzs7CZijOzqPYUw8nAoGBAN6UcLoVfMXf3MIM1iH7
9QZlhMzRLPgjhmI9J8GzR9taQ3+aO6FmyHKFYrzuJwEy4n1kFazwPjMWPtxJ/nbr
DyCvQLmwSTqA8cO5iROJIsmETGYu/lBc4EjkMeiaBTuml66p0JtmRQhQ0XjvvZxs
FrVJhdya2PqrJQsdlKUnzImpAoGAVNDGyuGEQG4U1P4RgepzYEC+p3F3ULLRSrd/
xtu0JoGAH2dc2l+vpGa8Z9RbLPovbH83cLxBn06hJjoMkbRklMzzjgO6Yb8Ua4Cd
rtNMpc5+9BHKVENUS15egs6pVHD86+WFxl7F+HIPUoCFVqP/wcOiljLigCiCoNB5
Lhkuz3cCgYAqOjdWkFNagemO6Hhjjnjpq8R1aZEWUfXIEWOJsd7Nm/LIkqlhRvte
/QgXnduz8hbOrszd5qSCLltf5nNMfLpxMXI8PVJZdqKaOII0l5JOyiFZXGFGk6CV
sW/Ih/0bt7WP0/BOGdlBJWWnutDDo+b8bSHF/2isW1020H7KLBU/3w==
-----END RSA PRIVATE KEY-----`;

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

			let server_private_key = forge.pki.privateKeyFromPem(SERVER_PRIVATE_KEY);
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

			var data = forge.util.createBuffer(encrypted_body);
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

			let server_private_key = forge.pki.privateKeyFromPem(SERVER_PRIVATE_KEY);
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
