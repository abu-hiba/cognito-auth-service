terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "eu-west-2"
}

resource "aws_cognito_user_pool" "user_pool_1" {
  name = "First user pool"
}

resource "aws_cognito_user_pool_client" "auth_service" {
  name = "auth_service"

  user_pool_id = aws_cognito_user_pool.user_pool_1.id
}
