import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve } from "path";

if (process.env.CI || process.env.NODE_ENV === "production") {
  process.exit(0);
}

const hooksPath = ".githooks";
const absHooksPath = resolve(process.cwd(), hooksPath);

if (!existsSync(absHooksPath)) {
  console.warn(
    `> ${hooksPath} not found at ${absHooksPath} — skipping git config`,
  );
  process.exit(0);
}

try {
  execSync(`git config core.hooksPath ${hooksPath}`, { stdio: "inherit" });
  console.info(`> git core.hooksPath set to ${hooksPath}`);
} catch (err) {
  console.error("> failed to set git core.hooksPath", err);
  process.exit(1);
}
