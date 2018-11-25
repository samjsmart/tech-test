resource "aws_api_gateway_rest_api" "api" {
  name        = "${local.csi}-api"
  description = "API for techtest frontend"
}