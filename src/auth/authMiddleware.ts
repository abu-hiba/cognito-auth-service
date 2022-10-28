import type { Handler } from "express"
import { CognitoJwtVerifier } from "aws-jwt-verify"
import { getSecret } from "../lib/secretsManager"


export const authMiddleware: Handler = async (req, res, next) => {
    const userPoolId = await getSecret('auth_service_user_pool_id')
    const clientId = await getSecret('auth_service_user_pool_client_id')

    if (!userPoolId) {
        res.status(500)
        throw new Error("Invalid user pool ID")
    }

    if (!clientId) {
        res.status(500)
        throw new Error("Invalid user pool client ID")
    }

    const verifier = CognitoJwtVerifier.create({
        userPoolId,
        tokenUse: "access",
        clientId,
    })

    try {
        await verifier.verify(req.cookies.cognito_access)
        next()
      } catch {
        res.status(401)
        res.json({ error: "Invalid access token" })
      }
}
