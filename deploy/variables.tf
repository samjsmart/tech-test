variable "aws_region" {
  default = "eu-west-2"
}

variable "environment" {
  default = "prod"
}

variable "domain" {
  description = "The domain that will be used for this project."
  default = "sam-smart.co.uk"
}

variable "frontend_subdomain" {
  description = "The subdomain that will be used to serve the frontend. This, combined with domain, will also be the S3 bucket name"
  default     = "tech-test"
}

variable "whitelist" {
  description = "Whitelisted IPs for access to this project"
  default     = [
    "0.0.0.0/0"
  ]
}

variable "secret_key" {
  description = "Secret key used for signing JsonWebTokens, this intentionally is left without a default value"
}