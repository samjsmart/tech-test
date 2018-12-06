resource "aws_api_gateway_deployment" "frontend" {
  depends_on = [
    "aws_api_gateway_integration.lambda",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.frontend.id}"
  stage_name  = "${var.environment}"
}