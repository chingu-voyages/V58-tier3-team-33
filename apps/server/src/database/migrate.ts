import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import {
  FileMigrationProvider,
  Migrator,
  NO_MIGRATIONS,
  type MigrationResultSet,
} from "kysely";
import { makeDb } from "./db.js";

const SUPPORTED_FLAGS = ["--init", "--reset"];
const flag = process.argv[2];

if (flag && !SUPPORTED_FLAGS.includes(flag)) {
  throw new Error("> unsupported migration flag", { cause: { flag } });
}

const MIGRATION_FOLDER = url.fileURLToPath(
  new url.URL("./migrations", import.meta.url),
);

const db = makeDb();
try {
  if (flag == "--reset") {
    console.info("> undoing migrations...");
    await migrate("DOWN");
    console.info("\n> migrations undone\n");
  }

  console.info("> applying migrations...");
  await migrate("UP");
  console.info("> migrations complete");
} catch (err) {
  console.error("> migrations failed");
  throw err;
} finally {
  await db.destroy();
}

async function migrate(direction: "UP" | "DOWN") {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path: {
        ...path,
        /*
        fixes migrations failing on windows machines.
        this problem exists because kysely doesn't follow the spec
        and treats absolute specifiers as paths instead of file URLs.
        see https://github.com/kysely-org/kysely/issues/768
        and https://nodejs.org/docs/latest/api/esm.html#terminology
        */
        join: (...args) => url.pathToFileURL(path.join(...args)).href,
      },
      migrationFolder: MIGRATION_FOLDER,
    }),
  });

  let migrationResult: MigrationResultSet;
  switch (direction) {
    case "UP":
      migrationResult = await migrator.migrateToLatest();
      break;
    case "DOWN":
      migrationResult = await migrator.migrateTo(NO_MIGRATIONS);
      break;
    default:
      migrationResult = {
        error: new Error("> unsupported migration process", {
          cause: { direction },
        }),
      } satisfies MigrationResultSet;
  }

  const { error, results } = migrationResult;
  if (results) {
    for (const { status, migrationName } of results) {
      let migrationMessage = `> migration ${migrationName}`;
      switch (status) {
        case "Error":
          console.error(`${migrationMessage} failed`);
          break;
        case "NotExecuted":
          console.warn(`> ${migrationMessage} skipped`);
          break;
        case "Success":
          migrationMessage += direction == "UP" ? " applied" : " reverted";
          console.info(migrationMessage);
          break;
        default:
      }
    }
  }

  if (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("> migrations failed", { cause: { error } });
  }
}
