import Joi from "joi"

const usernameSchema = Joi.string()
    .alphanum()
    .min(1)
    .max(30)
    .required()

const signUp = Joi.object({
    username: usernameSchema,
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/)
        .required(),
    email: Joi.string()
        .email()
        .required(),
})

const confirmSignUp = Joi.object({
    username: usernameSchema,
    confirmationCode: Joi.string()
        .min(1)
        .max(2048)
        .required(),
})

const resendConfirmationCode = Joi.object({
    username: usernameSchema
})

const signIn = Joi.object({
    username: usernameSchema,
    password: Joi.string()
        .min(1)
        .max(256)
        .required(),
})

export default {
    signUp,
    confirmSignUp,
    resendConfirmationCode,
    signIn,
}
