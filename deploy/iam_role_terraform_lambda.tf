resource "aws_iam_role" "terraform_lambda" {
  name               = "${local.csi}-terraform-lambda-role"
  assume_role_policy = "${data.aws_iam_policy_document.lambda_assume_role.json}"
}
