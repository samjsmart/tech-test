resource "aws_iam_policy" "api_lambda" {
  name        = "${local.csi}-api-lambda-policy"
  policy      = "${data.aws_iam_policy_document.api_lambda.json}"
}

resource "aws_iam_role_policy_attachment" "api_lambda_attachment" {
  role       = "${aws_iam_role.api_lambda.name}"
  policy_arn = "${aws_iam_policy.api_lambda.arn}"
}