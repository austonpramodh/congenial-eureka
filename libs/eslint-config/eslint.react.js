import eslintBase from "./eslint.base.js";
import EslintPluginReact from "eslint-plugin-react";
import globals from "globals";

const config = [...eslintBase];

config.push(
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...EslintPluginReact.configs.flat.recommended,
    settings: { react: { version: "detect" } },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
);

export default config;
