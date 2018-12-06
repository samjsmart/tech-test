resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.frontend.id}"
  parent_id   = "${aws_api_gateway_rest_api.frontend.root_resource_id}"
  path_part   = "{proxy+}"
}
