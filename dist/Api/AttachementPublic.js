"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AttachmentPublic {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    async post(buffer, contentType, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/attachment-public", "POST");
        // do the actual call
        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/attachment-public`, buffer, {
            "Content-Type": contentType,
            "X-Bunq-Attachment-Description": "Default description"
        }, {
            includesFile: true
        }));
        return response.Response[0].Uuid.uuid;
    }
}
exports.default = AttachmentPublic;
