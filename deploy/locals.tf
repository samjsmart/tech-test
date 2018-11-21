locals {
  project_name = "tech-test"
  account_id   = "${data.aws_caller_identity.current.account_id}"
  csi          = "${local.project_name}-${var.environment}"
  global_csi   = "${local.project_name}-${var.environment}-${local.account_id}"

  default_tags = {
    Project     = "${local.project_name}",
    Environment = "${var.environment}",
  }
}