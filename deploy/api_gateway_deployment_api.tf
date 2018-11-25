resource "aws_api_gateway_deployment" "api" {
  depends_on = [
    "aws_api_gateway_integration.api_lambda",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${var.environment}"
}