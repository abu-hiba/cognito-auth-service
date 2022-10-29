import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager"

const client = new SecretsManagerClient({ region: process.env.AWS_REGION })

export const getSecret = async (secretId: string) => {
    const command = new GetSecretValueCommand({
        SecretId: secretId
    })

    try {
        const { SecretString } = await client.send(command)
        return SecretString
    } catch (error) {
        console.log(`Error retrieving secret: ${secretId}.\n${error}`)
    }
}
