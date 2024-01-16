import {
  AdminInitiateAuthCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider"
import { v4 as uuidv4 } from 'uuid'
import { User } from "../domain/user"

export class UserService {
    private cognitoClient: CognitoIdentityProviderClient;
    private userPoolClientId = process.env.USER_POOL_CLIENT_ID;
    private userPoolId = process.env.USER_POOL_ID;

    constructor() {
        this.cognitoClient = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION,
        });
    }

    readonly signUp = async (user: User) => {
        const command = new SignUpCommand({
            ClientId: this.userPoolClientId,
            Username: uuidv4(),
            Password: user.getPassword(),
            UserAttributes: [
                {
                    Name: "email",
                    Value: user.getEmail(),
                },
            ],
        });
        
        return this.cognitoClient.send(command);
    }

    readonly confirmSignUp = async (username: string, confirmationCode: string) => {
        const command = new ConfirmSignUpCommand({
            ClientId: this.userPoolClientId,
            Username: username,
            ConfirmationCode: confirmationCode,
        });

        return this.cognitoClient.send(command);
    }

    readonly resendConfirmationCode = async (username: string) => {
        const command = new ResendConfirmationCodeCommand({
            ClientId: this.userPoolClientId,
            Username: username,
        });

        return this.cognitoClient.send(command);
    }

    readonly signIn = async (username: string, password: string) => {
        const command = new AdminInitiateAuthCommand({
            ClientId: this.userPoolClientId,
            UserPoolId: this.userPoolId,
            AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
        });

        return this.cognitoClient.send(command);
    }
}

