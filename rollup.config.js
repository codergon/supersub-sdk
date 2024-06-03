import pkg from "./package.json";
import json from "@rollup/plugin-json";
import styles from "rollup-plugin-styles";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import polyfillNode from "rollup-plugin-polyfill-node";
import external from "rollup-plugin-peer-deps-external";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default {
  input: "packages/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  external: [
    "react",
    "react-modal",
    "react-spinners",
    "@phosphor-icons/react",

    "@privy-io/react-auth",
    "@alchemy/aa-core",
    "@alchemy/aa-alchemy",
    "@alchemy/aa-accounts",

    "@privy-io/react-auth",
    // "@privy-io/wagmi",
  ],
  plugins: [
    // nodePolyfills(),
    external(),
    resolve({
      browser: true,
      preferBuiltins: true,
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs(),
    styles(),
    json(),
    polyfillNode(),
  ],
};
