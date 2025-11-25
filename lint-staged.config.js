/*
prettier is a subtask of each entry
because tasks run in parallel by default
and subtasks always run sequentially (see --concurrent)
*/
export default {
  "apps/client/**/*.{jsx,tsx,js,ts,mjs,mts,cjs,cts}": [
    "eslint --fix --max-warnings=0 -c apps/client/eslint.config.js",
    "prettier --write",
  ],
  "apps/server/**/*.{js,ts,mjs,mts,cjs,cts}": [
    "eslint --fix --max-warnings=0 -c apps/server/eslint.config.js",
    "prettier --write",
  ],
  "*": (paths) => {
    const remaining = paths.filter(
      (path) =>
        !path.match(
          /\/apps\/(client|server)\/.+\.(jsx|tsx|js|ts|mjs|mts|cjs|cts)$/,
        ),
    );
    if (remaining.length == 0) {
      /*
      idk why, but when this task outputs nothing (""), I get the error below
      after I get 2 lines of [FAILED] [FAILED] in the middle of lint-staged's run log.
      ✖  failed without output (FAILED).
      ✖ eslint --max-warnings=0 --debug -c apps/client/eslint.config.js failed to spawn
      a cursory search gave nothing. not worth digging more unless it happens again
      */
      return "echo 'no files to format that slipped from the other tasks'";
    }

    return `prettier --write --ignore-unknown ${remaining.join(" ")}`;
  },
};
