resource "aws_iam_role" "api_lambda" {
  name               = "${local.csi}-api-lambda-role"
  assume_role_policy = "${data.aws_iam_policy_document.lambda_assume_role.json}"
}
