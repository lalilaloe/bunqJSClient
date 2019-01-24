import * as Url from "url";
import { signString } from "../Crypto/Sha256";
import BunqJSClient from "../BunqJSClient";
import Session from "../Session";
import LoggerInterface from "../Interfaces/LoggerInterface";
import Request from "./Request";
const forge = require("node-forge/lib/forge");

import ApiAdapterOptions from "../Types/ApiAdapterOptions";

export default class SignRequestHandler {
	public Session: Session;

	constructor(Session: Session) {
		this.Session = Session;
	}

	/**
     * Signs a request using our privatekey
     * @param {Request} request
     * @param {ApiAdapterOptions} options
     * @returns {Promise<string>}
     */
	public async signRequest(request: Request, options: ApiAdapterOptions): Promise<void> {
		const template = this.prepareTemplate(request)
		const signature = this.generateSignature(template)

		request.setSigned(signature);
	}

	public generateSignature(request: String): string {
		const messageDigest = forge.sha256.create();
		messageDigest.update(request, "raw");
		const signature = this.Session.privateKey.sign(
			messageDigest
		)
		return forge.util.encode64(signature);
	}

	public prepareHeaders(request: Request): string {
		const headerStrings = [];
		Object.keys(request.headers)
			.sort()
			.map(headerKey => {
				if (
					headerKey.includes("X-Bunq") ||
					headerKey.includes("Cache-Control") ||
					headerKey.includes("User-Agent")
				) {
					headerStrings.push(`${headerKey}: ${request.headers[headerKey]}`);
				}
			});
		return headerStrings.join("\n");
	}

	public prepareTemplate(request: Request): string {
		let url: string = request.requestConfig.url;
		if (request.requestConfig.params && Object.keys(request.requestConfig.params).length > 0) {
			const params = new Url.URLSearchParams(request.requestConfig.params);
			url = `${request.requestConfig.url}?${params.toString()}`;
		}
		// manually include the user agent
		if (!request.getHeader("User-Agent")) {
			if (typeof navigator === "undefined") {
				const nodeUserAgent = `Node-${process.version}-bunqJSClient`;
				request.setHeader("User-Agent", nodeUserAgent);
			} else {
				request.setHeader("User-Agent", navigator.userAgent);
			}
		}
		const headerBytes = this.prepareHeaders(request)
		const toSign = `${request.method} ${url}
${headerBytes}

${request.data}`;
		return toSign;
	}
}
