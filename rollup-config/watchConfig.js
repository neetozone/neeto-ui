import fs from "fs";
import { createRequire } from "module";
import path from "path";

import { globby } from "globby";
import copy from "rollup-plugin-copy";

const require = createRequire(import.meta.url);

const getAppArg = () => {
  const argv = process.argv.slice(2);

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--app" && argv[i + 1] && !argv[i + 1].startsWith("--")) {
      return argv[i + 1];
    }

    if (argv[i].startsWith("--app=")) {
      return argv[i].split("=")[1];
    }
  }

  return null;
};

const emitReadyFile = destination => ({
  name: "emit-ready-file",
  writeBundle: () => {
    const markerPath = path.join(destination, ".ready");
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    require("fs").writeFileSync(
      markerPath,
      `Built at ${new Date().toISOString()}`
    );
  },
});

const watchPaths = customWatchPaths => ({
  name: "watch-translations",
  async buildStart() {
    const pathsToWatch = [];

    if (fs.existsSync("app/javascript/src/translations")) {
      pathsToWatch.push("app/javascript/src/translations");
    } else if (fs.existsSync("src/translations")) {
      pathsToWatch.push("src/translations");
    }

    if (fs.existsSync("typeTemplates")) {
      pathsToWatch.push("typeTemplates/**/*");
    } else {
      pathsToWatch.push("types/**/*");
      pathsToWatch.push("*.d.ts");
    }

    if (customWatchPaths && customWatchPaths.length) {
      pathsToWatch.push(...customWatchPaths);
    }

    const matchedPaths = await globby(pathsToWatch);

    matchedPaths.forEach(p => this.addWatchFile(path.resolve(p)));
  },
});

const copyFiles = (destination, customCopyPaths) =>
  copy({
    targets: [
      { src: "package.json", dest: destination },
      { src: "*.d.ts", dest: destination },
      { src: "types/", dest: destination },
      { src: "LICENSE.md", dest: destination },
      { src: "src/translations", dest: path.join(destination, "src") },
      {
        src: "app/javascript/src/translations",
        dest: path.join(destination, "app/javascript/src"),
      },
      ...customCopyPaths.map(p => ({
        src: p.src,
        dest: path.join(destination, p.dest),
      })),
    ],
  });

const getWatchConfig = ({
  customCopyPaths = [],
  customWatchPaths = [],
} = {}) => {
  const appArg = getAppArg();

  if (!appArg) return { watchPlugins: [], appPath: null };

  const currentDir = process.cwd();
  const packageJson = require(path.resolve(currentDir, "package.json"));

  const appPath = path.resolve(
    currentDir,
    appArg,
    "node_modules",
    packageJson.name
  );

  const watchPlugins = [
    watchPaths(customWatchPaths),
    copyFiles(appPath, customCopyPaths),
    emitReadyFile(appPath),
  ];

  return { watchPlugins, appPath };
};

export { getWatchConfig };
