resource "aws_iam_role" "terraform_lambda" {
  name               = "${local.csi}-terraform-lambda-role"
  assume_role_policy = "${data.aws_iam_policy_document.terraform_lambda_assume_role.json}"
}

data "aws_iam_policy_document" "terraform_lambda_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}