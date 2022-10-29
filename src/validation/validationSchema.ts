import type { JSONSchemaType } from "ajv"
import type { ConfirmParams, ResendConfirmParams, SignInParams, SignUpParams } from "../auth"

const usernameSchema: JSONSchemaType<string> = {
    type: "string",
    minLength: 1,
    maxLength: 30,
}

export const signUpSchema: JSONSchemaType<SignUpParams> = {
    type: "object",
    required: ["username", "password", "email"],
    properties: {
        username: usernameSchema,
        password: {
            type: "string",
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$",
            minLength: 8,
            maxLength: 256,
        },
        email: {
            type: "string",
            pattern: "^\\S+@\\S+\\.\\S+$",
        }
    },
    additionalProperties: false,
}

export const confirmSignUpSchema: JSONSchemaType<ConfirmParams> = {
    type: "object",
    required: ["username", "confirmationCode"],
    properties: {
        username: usernameSchema,
        confirmationCode: {
            type: "string",
            minLength: 1,
            maxLength: 2048,
        }
    },
    additionalProperties: false,
}

export const resendConfirmationCodeSchema: JSONSchemaType<ResendConfirmParams> = {
    type: "object",
    required: ["username"],
    properties: {
        username: usernameSchema,
    },
    additionalProperties: false,
}

export const signInSchema: JSONSchemaType<SignInParams> = {
    type: "object",
    required: ["username", "password"],
    properties: {
        username: usernameSchema,
        password: {
            type: "string",
            minLength: 1,
            maxLength: 256,
        },
    },
    additionalProperties: false,
}
