resource "aws_lambda_function" "terraform" {
  filename          = "../terraformLambda/artefacts/payload.zip"
  source_code_hash  = "${base64sha256(file("../terraformLambda/artefacts/payload.zip"))}"
  function_name     = "${local.csi}-terraform-lambda"
  role              = "${aws_iam_role.terraform_lambda.arn}"
  handler           = "index.handler"
  runtime           = "nodejs8.10"
  timeout           = "900"
  tags              = "${local.default_tags}"

  environment {
    variables = {
      STATE_BUCKET = "${aws_s3_bucket.terraform_state.id}"
      INFRA_BUCKET = "${aws_s3_bucket.infrastructure.id}"
    }
  }
}