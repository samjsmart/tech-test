resource "aws_dynamodb_table" "users" {
  name           = "users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "Email"

  attribute {
    name = "Email"
    type = "S"
  }

  tags = "${local.default_tags}"
}
