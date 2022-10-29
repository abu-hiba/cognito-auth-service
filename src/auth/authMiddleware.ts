import type { Handler } from "express"
import { CognitoJwtVerifier } from "aws-jwt-verify"
import { getSecret } from "../lib/secretsManager"

export const authMiddleware: Handler = async (req, res, next) => {
    const userPoolId = await getSecret('auth_service_user_pool_id')
    const clientId = await getSecret('auth_service_user_pool_client_id')
    const { cognito_access } = req.cookies

    if (!userPoolId) {
        console.log("Could not get user pool ID")
        return next(new Error("Could not authenticate user"))
    }

    if (!clientId) {
        console.log("Could not get user pool client ID")
        return next(new Error("Could not authenticate user"))
    }

    const verifier = CognitoJwtVerifier.create({
        userPoolId,
        tokenUse: "access",
        clientId,
    })

    try {
        await verifier.verify(cognito_access)
        next()
      } catch {
        res.status(401)
        next(new Error("Invalid access token"))
      }
}
