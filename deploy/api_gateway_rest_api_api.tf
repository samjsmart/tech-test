resource "aws_api_gateway_rest_api" "frontend" {
  name        = "${local.csi}-frontend-api"
  description = "API for techtest frontend"
}