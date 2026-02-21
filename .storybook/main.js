import path from "path";
import { mergeDeepLeft } from "ramda";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

import commonResolve from "@bigbinary/neeto-commons-frontend/configs/nanos/webpack/resolve.js";
import projectResolve from "../alias.js";

const rootResolve = mergeDeepLeft(projectResolve, commonResolve);

const config = {
  staticDirs: ["./public"],
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/preset-scss",
    "@storybook/addon-docs",
    "@vueless/storybook-dark-mode",
    "storybook-addon-rtl",
    "@github-ui/storybook-addon-performance-panel/preset",
  ],

  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(js|jsx|mjs|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      },
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...rootResolve.alias,
          src: path.resolve(import.meta.dirname, "..", "src"),
          "@bigbinary/neetoui": path.resolve(import.meta.dirname, "..", "src"),
        },
        extensions: [
          ...(config.resolve.extensions || []),
          ".js",
          ".jsx",
          ".mdx",
          ".ts",
          ".tsx",
        ],
      },
      plugins: [
        ...config.plugins,
        new MonacoWebpackPlugin({
          languages: ["javascript"],
        }),
      ],
    };
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};

export default config;
