/*
prettier is a subtask of each entry
because tasks run in parallel by default
and subtasks always run sequentially (see --concurrent)
*/
export default {
  "apps/client/*.{jsx,tsx,js,ts,mjs,mts,cjs,cts}": [
    "eslint --fix --max-warnings=0 -c apps/client/eslint.config.js",
    "prettier --write",
  ],
  "*": (paths) => {
    const remaining = paths.filter(
      (path) =>
        !path.match(/\/apps\/client\/.+\.(jsx|tsx|js|ts|mjs|mts|cjs|cts)$/),
    );
    if (remaining.length == 0) {
      return null;
    }

    return `prettier --write --ignore-unknown ${remaining.join(" ")}`;
  },
};
