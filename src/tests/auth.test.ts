
import { describe, it, expect } from "vitest";
import { getAPIKey } from "../api/auth";

describe("getAPIKey", () => {
    it("returns null when the Authorization header is missing", () => {
        const headers = {} as Record<string, unknown>;
        expect(getAPIKey(headers as any)).toBeNull();
    });

    it("returns null when the Authorization header is not an ApiKey scheme", () => {
        const headers = { authorization: "Bearer sometoken" } as Record<string, unknown>;
        expect(getAPIKey(headers as any)).toBeNull();
    });

    it("returns null when the Authorization header is malformed", () => {
        const headers = { authorization: "ApiKey" } as Record<string, unknown>;
        expect(getAPIKey(headers as any)).toBeNull();
    });

    it("returns the API key when Authorization is 'ApiKey <key>'", () => {
        const headers = { authorization: "ApiKey my-secret-key" } as Record<string, unknown>;
        expect(getAPIKey(headers as any)).toBe("my-secret-key");
    });
});
