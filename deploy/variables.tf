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

variable "allowed_methods" {
  description = "Allowed methods"
  type        = "list"

  default = [
    "OPTIONS",
    "HEAD",
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ]
}

variable "allowed_origin" {
  description = "Allowed origin"
  type        = "string"
  default     = "*"
}

variable "allowed_headers" {
  description = "Allowed headers"
  type        = "list"

  default = [
    "Content-Type",
    "X-Amz-Date",
    "Authorization",
    "X-Api-Key",
    "X-Amz-Security-Token",
  ]
}

variable "allowed_max_age" {
  description = "Allowed response caching time"
  type        = "string"
  default     = "7200"
}