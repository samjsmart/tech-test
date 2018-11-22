resource "aws_s3_bucket" "frontend" {
  bucket = "${var.frontend_subdomain}.${var.domain}"
  tags   = "${local.default_tags}"

  website {
    index_document = "index.html"
  }
}