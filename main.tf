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

resource "aws_dynamodb_table" "user_sessions" {
  name         = "user_sessions"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "SessionId"

  attribute {
    name = "SessionId"
    type = "S"
  }

  ttl {
    enabled        = true
    attribute_name = "ExpirationTime"
  }
}

resource "aws_secretsmanager_secret" "auth_service_user_pool_id" {
  name = "auth_service_user_pool_id"
}

resource "aws_secretsmanager_secret" "auth_service_user_pool_client_id" {
  name = "auth_service_user_pool_client_id"
}

resource "aws_secretsmanager_secret" "session_secret" {
  name = "session_secret"
}

resource "aws_secretsmanager_secret" "session_name" {
  name = "session_name"
}

resource "aws_secretsmanager_secret" "session_lifetime" {
  name = "session_lifetime"
}

