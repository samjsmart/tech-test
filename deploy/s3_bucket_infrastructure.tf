resource "aws_s3_bucket" "infrastructure" {
  bucket = "${local.global_csi}-infrastructure"
  tags   = "${local.default_tags}"
}