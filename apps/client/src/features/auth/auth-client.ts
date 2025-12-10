import { createAuthClient } from "better-auth/react";
import { ENV } from "../../config/env";

export const authClient = createAuthClient({
  baseURL: `${ENV.VITE_API_URL}/api/v1/auth`,
});
