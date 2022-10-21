import { CognitoIdentityProviderClient, ConfirmSignUpCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION
})

export const signUp = async ({ username, password, email }) => {
    const params = {
        ClientId: process.env.USER_POOL_CLIENT_ID,
        Username: username,
        Password: password,
        UserAttributes: [
          {
            Name: "email",
            Value: email
          },
        ],
    }
    
    const command = new SignUpCommand(params)

    try {
        return await client.send(command)
      } catch (error) {
        throw error
      }
}

export const confirmSignUp = async ({ username, confirmationCode }) => {
  const params = {
    ClientId: process.env.USER_POOL_CLIENT_ID,
    Username: username,
    ConfirmationCode: confirmationCode,
  }

  const command = new ConfirmSignUpCommand(params)

  try {
    return await client.send(command)
  } catch (error) {
    throw error
  }
}
