import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";
import SetupApp from "../../TestHelpers/SetupApp";
import Request from "../../../src/HTTP/Request";
import SignRequestHandler from "../../../src/HTTP/SignRequestHandler";

const method = "GET";
const path = "/";
const headers = {
	'Cache-Control': 'no-cache',
	'User-Agent': 'bunq-TestServer/1.00 sandbox/0.17b3',
	'X-Bunq-Client-Authentication': 'f15f1bbe1feba25efb00802fa127042b54101c8ec0a524c36464f5bb143d3b8b',
	'X-Bunq-Client-Request-Id': '57061b04b67ef',
	'X-Bunq-Geolocation': '0 0 0 0 NL',
	'X-Bunq-Language': 'en_US',
	'X-Bunq-Region': 'en_US',
};

const expectedSignature = "o5AXc4Ag72GzfzXwDbvlEck3SnrEILHVjmc6wJhjZVGn+rtPmAilCKQiSvneo2VbjwuP2vHJdZEQk4NF/1PmrVByUjdmCF/c9y5LP/w4+SgZMoyu6DfzDtoVRMMFM0tC4MPVaAZ8//vniQEaR7EK3RBL5Nh4dUnA3UVQ972SbTl+Huof5XknUlONOpzSU+ms3VIj8FmogzfRmjnJoDUvfwxY+5mRhQDi9wD+nAXPUo2yT2OL1by/RkE5bfLlBbZXmUwXYMQ8IHAF7Rnow8aBY7FCjl8YeSulw58bPOb9HJJM3lk0ZaPisN/S1HbwQ9LcRLX0SdSuKlvnu2U/uZv8AA=="
const body = `{"amount": 10}`;

const expectedToSign = `GET /
Cache-Control: no-cache
User-Agent: bunq-TestServer/1.00 sandbox/0.17b3
X-Bunq-Client-Authentication: f15f1bbe1feba25efb00802fa127042b54101c8ec0a524c36464f5bb143d3b8b
X-Bunq-Client-Request-Id: 57061b04b67ef
X-Bunq-Geolocation: 0 0 0 0 NL
X-Bunq-Language: en_US
X-Bunq-Region: en_US

{"amount": 10}`

describe("SignRequest", () => {
	let bunqApp: BunqJSClient;
	let request: Request;
	let handler: SignRequestHandler;

	beforeEach(async function () {
		moxios.install();
		bunqApp = await SetupApp();
		request = new Request(path, method, body, headers);
		handler = bunqApp.ApiAdapter.SignRequestHandler;
	});

	afterEach(function () {
		moxios.uninstall();
	});

	it("can prepare an template to sign from an HTTP request", async () => {
		const toSign = await handler.prepareTemplate(request)
		expect(toSign).toBe(expectedToSign)
	})

	it("given a header other than Cache-Control, User-Agent and X-Bunq omits that from the template", async () => {
		request.setHeader("Accept", '*/*');
		request.setHeader("Content-Type", 'application/json');

		const toSign = await handler.prepareTemplate(request)
		expect(toSign).toBe(expectedToSign)
	})

	it("can sign a template correctly from an HTTP request", async () => {
		await handler.signRequest(request, null)
		expect(request.isSigned).toBe(expectedSignature)
	})

	it("can sign a template with encrypted data correctly", async () => {
		const hex2bin = str => str.match(/.{1,2}/g).reduce((str, hex) => str += String.fromCharCode(parseInt(hex, 16)), '');
		request.setData(hex2bin("b4086697c4fa9af691ca18c49635e5d8930afed8051b3a10ce77d3997dcd10c2"));
		await handler.signRequest(request, null)
		expect(request.isSigned).toBe("YbhmVnIZsXcKE2bLmxdkdADJUvasOz1uF8NUyTI9uCxn6Ei1pmmyTzCb6zDUPkqdIlIo65LZPDIqtdLwmLS67Z51HWf/yNP28/StD8gOMt9QwLATo3gPPabIv62Val0Xk6jhX+BY1/fdAZSahPzHtdQWzS9gewdp7DwdYoGHxpuGA7YQgEBddg2CS9WwqJd2M33MYoyaPk+oF9XIWpM4DqZH6Asn+Ayo5wdKwdNOxr47oe5WIrjY+fTpUKV+UqZpXdqS9OopaJIOSJJS8eLrkfwuqRgW3m/MPGKnpe0XnscDbbdxvRj6PijN/x/a5GkDmzevnqQyKkKJjbFqu+93Rw==")
	})

	it("given a header other than Cache-Control, User-Agent and X-Bunq omits that header from the signature", async () => {
		request.setHeader("Accept", '*/*');
		request.setHeader("Content-Type", 'application/json');
		await handler.signRequest(request, null)

		expect(request.isSigned).toBe(expectedSignature)
	})

	it("given a different HTTP method creates a different signature", async () => {
		request = new Request(path, 'POST', body, headers);
		await handler.signRequest(request, null)

		expect(request.isSigned).not.toBe(expectedSignature)
	})

	it("given a different HTTP path creates a different signature", async () => {
		request = new Request('/installation', method, body, headers);
		await handler.signRequest(request, null)

		expect(request.isSigned).not.toBe(expectedSignature)
	})
	it("given a different body creates a different signature", async () => {
		let request = new Request(path, method, { amount: 50 }, headers);
		await handler.signRequest(request, null)

		expect(request.isSigned).not.toBe(expectedSignature)
	})
})