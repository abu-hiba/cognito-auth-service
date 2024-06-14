# cognito-authn-service

A simple POC microservice for authentication using AWS cognito for the purpose of learning Terraform and HCL for provisioning the infrastructure as code.

## Run locally
You will need Docker installed and to have set the following environment variables:
```
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```
Then install packages and run:
```sh
$ npm i
$ npm run dev
```

## Apply terraform changes
You will need terraform and the aws cli installed.
In order to apply changes you will need to have configured the aws-cli with a valid AWS Access Key ID and AWS Secret Access Key.
To initialise your terraform workspace (run in project root):
```sh
$ terraform init
```
To apply any infrastructure changes:
```sh
$ terraform apply
```
