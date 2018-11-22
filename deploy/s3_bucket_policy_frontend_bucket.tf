resource "aws_s3_bucket_policy" "frontend_bucket" {
  bucket = "${aws_s3_bucket.frontend.id}"
  policy = "${data.aws_iam_policy_document.frontend_bucket.json}"
}