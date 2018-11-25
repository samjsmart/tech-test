resource "aws_iam_policy" "terraform_lambda" {
  name        = "${local.csi}-terraform-lambda-policy"
  policy      = "${data.aws_iam_policy_document.terraform_lambda.json}"
}

resource "aws_iam_role_policy_attachment" "terraform_lambda_attachment" {
  role       = "${aws_iam_role.terraform_lambda.name}"
  policy_arn = "${aws_iam_policy.terraform_lambda.arn}"
}