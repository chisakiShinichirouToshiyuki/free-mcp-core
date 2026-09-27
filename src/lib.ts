// Library entry — re-exports public API surface for downstream consumers.
//
// CLI entry (src/index.ts) handles auto-init (logger, config). Library consumers
// MUST call init functions (initLogger, initTelemetry, loadConfig) themselves
// before using server primitives.

export { makeApiRequest } from './api/client.js';
// Reusable skill install/update/uninstall helpers for downstream wrappers.
// Wrappers can call these for both core's bundled skills (via
// getBundledSkillsDir()) and their own skills/ directory.
export {
  installSkillsFrom,
  parseSkillCommandArgs,
  type SkillCommandOptions,
  type SkillCommandResult,
  uninstallSkillsFrom,
  updateSkillsFrom,
} from './cli/skills.js';
export {
  type Config,
  getConfig,
  loadConfig,
} from './config.js';
export { addFileUploadTool } from './mcp/file-upload-tool.js';
export { createMcpServer } from './mcp/handlers.js';
export type { SkillResourceOptions } from './mcp/skill-resources.js';
export { registerSkillResources } from './mcp/skill-resources.js';
export { addAuthenticationTools } from './mcp/tools.js';
export { generateClientModeTool } from './openapi/client-mode.js';
export {
  API_CONFIGS,
  type ApiType,
  listAllAvailablePaths,
  validatePathForService,
} from './openapi/schema-loader.js';
export {
  getLogger,
  initLogger,
} from './server/logger.js';
export {
  getUserAgent,
  initUserAgentTransportMode,
} from './server/user-agent.js';
export {
  getSignCredentials,
  loadSignConfig,
  type SignConfig,
} from './sign/config.js';
// Sign (電子契約) server primitives, mirroring the accounting-side surface
// above so downstream wrappers can compose a Sign MCP server too.
export { addSignFileUploadTool } from './sign/file-upload-tool.js';
export { createSignMcpServer } from './sign/handlers.js';
export {
  addSignApiTools,
  addSignAuthenticationTools,
} from './sign/tools.js';
// Skill bundle directory resolution helper for consumers that want to install
// or expose the bundled skills/ from this package.
export { getBundledSkillsDir } from './skills-path.js';
export {
  type AuthExtra,
  extractTokenContext,
  resolveCompanyId,
  type TokenContext,
} from './storage/context.js';
export { initTelemetry } from './telemetry/init.js';
export {
  createTextResponse,
  formatErrorMessage,
  parseJsonResponse,
} from './utils/error.js';
