import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION
})

export const signUp = async ({ username, password }) => {
    const params = {
        ClientId: process.env.USER_POOL_CLIENT_ID,
        Username: username,
        Password: password,
    }
    
    const command = new SignUpCommand(params)

    try {
        return await client.send(command)
      } catch (error) {
        throw error
      }
}
