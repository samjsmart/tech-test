resource "aws_s3_bucket" "terraform_state" {
  bucket = "${local.global_csi}-terraform-state"
  tags   = "${local.default_tags}"
}