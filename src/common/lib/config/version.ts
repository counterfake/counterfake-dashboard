import "server-only";

import packageJson from "../../../../package.json";

/**
 * This config is a server only config that is used to get the app name and version.
 */
export const VERSION = packageJson.version;
