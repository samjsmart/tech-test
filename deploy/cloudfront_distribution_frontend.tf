resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true

  origin {
    domain_name = "${aws_s3_bucket.frontend.bucket_regional_domain_name}"
    origin_id   = "frontendCloudfrontOrigin"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.frontend.cloudfront_access_identity_path}"
    }
  }
  
  default_cache_behavior {
    allowed_methods  = [
      "HEAD",
      "DELETE",
      "POST",
      "GET",
      "OPTIONS",
      "PUT",
      "PATCH",
    ]

    cached_methods   = [
      "GET",
      "HEAD"
    ]

    target_origin_id = "frontendCloudfrontOrigin"

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }

    #No caching while deving
    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  #This is what makes angular routing work
  custom_error_response {
    error_code        = "404"
    response_code     = "200"
    response_page_path = "/index.html"
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["GB"]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = "${local.default_tags}"
}