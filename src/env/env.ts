/* This file can be replaced during build by using the `fileReplacements` array.
`ng build` replaces `env.ts` with `env.prod.ts`.
The list of file replacements can be found in `angular.json`. */

import { Env } from "@models/env";

export const env: Env = {
  name: "prod",
  apiUrl: "http://localhost:3000/api",
  apiUrlWebSocket: "ws://localhost:3000/api",
} as const;
