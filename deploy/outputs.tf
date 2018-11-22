output "infrastructure_bucket" {
  value = "${aws_s3_bucket.infrastructure.id}"
}

output "cloudfront_domain" {
  value = "${aws_cloudfront_distribution.frontend.domain_name}"
}