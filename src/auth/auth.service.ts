import {
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  ResendConfirmationCodeCommand,
  ResendConfirmationCodeCommandInput,
  SignUpCommand,
  SignUpCommandInput
} from "@aws-sdk/client-cognito-identity-provider"
import { getSecret } from "../util/secretsManager"

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION
})

type SignUpParams = {
  username: string
  password: string
  email: string
}

const signUp = async ({ username, password, email }: SignUpParams) => {
  const userPoolClientId = await getSecret('auth_service_user_pool_client_id')

  const params: SignUpCommandInput = {
      ClientId: userPoolClientId,
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

type ConfirmParams = {
  username: string
  confirmationCode: string
}

const confirmSignUp = async ({ username, confirmationCode }: ConfirmParams) => {
  const userPoolClientId = await getSecret('auth_service_user_pool_client_id')

  const params: ConfirmSignUpCommandInput = {
    ClientId: userPoolClientId,
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

type ResendConfirmParams = {
  username: string
}

const resendConfirmationCode = async ({ username }: ResendConfirmParams) => {
  const userPoolClientId = await getSecret('auth_service_user_pool_client_id')

  const params: ResendConfirmationCodeCommandInput = {
    ClientId: userPoolClientId,
    Username: username,
  }

  const command = new ResendConfirmationCodeCommand(params)

  try {
    return await client.send(command)
  } catch (error) {
    throw error
  }
}

type SignInParams = {
  username: string
  password: string
}

const signIn = async ({ username, password }: SignInParams) => {
  const userPoolClientId = await getSecret('auth_service_user_pool_client_id')
  const userPoolId = await getSecret('auth_service_user_pool_id')

  const params: AdminInitiateAuthCommandInput = {
    ClientId: userPoolClientId,
    UserPoolId: userPoolId,
    AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  }

  const command = new AdminInitiateAuthCommand(params)

  try {
    return await client.send(command)
  } catch (error) {
    throw error
  }
}

export default {
  signUp,
  confirmSignUp,
  resendConfirmationCode,
  signIn,
}
