resource "aws_lambda_function" "api" {
  filename          = "../api-lambda/artefacts/payload.zip"
  source_code_hash  = "${base64sha256(file("../api-lambda/artefacts/payload.zip"))}"
  function_name     = "${local.csi}-api-lambda"
  role              = "${aws_iam_role.api_lambda.arn}"
  handler           = "index.handler"
  runtime           = "nodejs8.10"
  timeout           = "900"
  tags              = "${local.default_tags}"

  environment {
    variables = {
      SECRET_KEY = "${var.secret_key}"
      USER_TABLE = "${aws_dynamodb_table.users.id}"
    }
  }
}