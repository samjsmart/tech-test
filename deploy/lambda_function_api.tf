resource "aws_lambda_function" "api" {
  filename          = "../apiLambda/artefacts/payload.zip"
  source_code_hash  = "${base64sha256(file("../apiLambda/artefacts/payload.zip"))}"
  function_name     = "${local.csi}-api-lambda"
  role              = "${aws_iam_role.api_lambda.arn}"
  handler           = "index.handler"
  runtime           = "nodejs8.10"
  timeout           = "900"
  tags              = "${local.default_tags}"
}