terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "eu-west-2"
}

resource "aws_cognito_user_pool" "user_pool_1" {
  name                     = "Authn user pool"
  alias_attributes = ["email"]
}

resource "aws_cognito_user_pool_client" "authn_service" {
  name = "authn_service"

  user_pool_id = aws_cognito_user_pool.user_pool_1.id

  explicit_auth_flows = ["ALLOW_ADMIN_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
}

