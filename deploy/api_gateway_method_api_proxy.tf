resource "aws_api_gateway_method" "api_proxy" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.api_proxy.id}"
  http_method   = "ANY"
  authorization = "NONE"
}