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
  name                     = "First user pool"
  auto_verified_attributes = ["email"]
}

resource "aws_cognito_user_pool_client" "auth_service" {
  name = "auth_service"

  user_pool_id = aws_cognito_user_pool.user_pool_1.id

  explicit_auth_flows = ["ALLOW_ADMIN_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
}

resource "aws_secretsmanager_secret" "auth_service_user_pool_id" {
  name = "auth_service_user_pool_id"
} 

resource "aws_secretsmanager_secret" "auth_service_user_pool_client_id" {
  name = "auth_service_user_pool_client_id"
}
