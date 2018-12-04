import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

import LimitCollection from "../../../src/Types/LimitCollection";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("Card", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.list(1, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#ACTIVATE", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.activate(1, 2, "activationCode");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#SETPINCODE", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.setPinCode(1, 2, "123456")
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#SETLIMITS", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.setLimits(
                1,
                2,
                [
                    {
                        daily_limit: "12.00",
                        currency: "EUR",
                        type: "CARD_LIMIT_ATM"
                    }
                ])
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#SETCOUNTRYPERMISSIONS", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.setCountryPermissions(
                1,
                2,
                [
                    {
                        country: "NL",
                        expiry_time: "999"
                    }
                ])
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
