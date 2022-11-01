# cognito-auth-service

A simple POC microservice for authentication using AWS cognito, including terraform code for provisioning the neccessary infrastructure.

## Run locally
You will need Docker installed and to have set environment variables.
```
$ npm i
$ npm run dev
```

## Apply terraform changes
You will need terraform and the aws cli installed.
In order to apply changes you will need to have configured the aws-cli with a valid AWS Access Key ID and AWS Secret Access Key.
```
$ terraform init
$ terraform apply
```
