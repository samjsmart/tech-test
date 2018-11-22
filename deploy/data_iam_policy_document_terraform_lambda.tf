data "aws_iam_policy_document" "terraform_lambda" {
  statement {
    actions = [
      "s3:*"
    ]

    resources = [
      "${aws_s3_bucket.terraform_state.arn}/*",
      "${aws_s3_bucket.terraform_state.arn}",
      "${aws_s3_bucket.infrastructure.arn}/*",
      "${aws_s3_bucket.infrastructure.arn}",
    ]
  }

  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]

    resources = [
      "arn:aws:logs:*:*:*",
    ]
  }

  //Allow creation of buckets
  statement {
    actions = [
      "s3:*"
    ]

    resources = [
      "*"
    ]
  }
}