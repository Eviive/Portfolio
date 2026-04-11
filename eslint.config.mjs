import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";

export default defineConfig([
    globalIgnores(["node_modules/**", "eslint.config.mjs"]),

    js.configs.recommended,
    ...ts.configs.strictTypeChecked,
    ...ts.configs.stylisticTypeChecked,
    react.configs.flat.recommended,
    react.configs.flat["jsx-runtime"],
    reactHooks.configs.flat["recommended-latest"],
    reactRefresh.configs.vite,
    eslintConfigPrettier,
    ...nextVitals,
    ...nextTs,

    {
        languageOptions: {
            globals: {
                ...globals.browser
            },
            parserOptions: {
                projectService: true
            }
        },

        settings: {
            react: {
                version: "detect"
            },
            "import/resolver": {
                typescript: {}
            }
        },

        rules: {
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    prefer: "type-imports",
                    fixStyle: "separate-type-imports"
                }
            ],
            "@typescript-eslint/no-import-type-side-effects": ["error"],
            "@typescript-eslint/consistent-type-exports": [
                "error",
                {
                    fixMixedExportsWithInlineTypeSpecifier: false
                }
            ],
            "@typescript-eslint/no-misused-promises": [
                "error",
                {
                    checksVoidReturn: {
                        attributes: false
                    }
                }
            ],
            "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
            "react/self-closing-comp": [
                "error",
                {
                    component: true,
                    html: false
                }
            ]
        }
    }
]);
