import { createWriteStream, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import archiver from "archiver";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DIST_DIR = join(__dirname, "..", "dist");
const ZIP_NAME = "chrome-extension-devtools.zip";
const ZIP_PATH = join(__dirname, "..", ZIP_NAME);

if (existsSync(ZIP_PATH)) {
  rmSync(ZIP_PATH);
}

const output = createWriteStream(ZIP_PATH);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () =>
  console.log(`${ZIP_NAME} created: ${archive.pointer()} bytes`)
);
archive.on("error", (err) => {
  console.error("Error creating ZIP:", err.message);
  process.exitCode = 1;
});

archive.pipe(output);
archive.directory(DIST_DIR, false);
archive.finalize();
