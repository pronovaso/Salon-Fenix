import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import path from "node:path";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

// @ts-check
/// <reference path="eslint-typegen.d.ts" />
import typegen from 'eslint-typegen';
/**
* @type { import("eslint").Linter.Config[] }
*/ 

const config = [
    {
        ignores: [
            "**/node_modules",
            "**/lib",
            "**/.next",
            "**/.vscode",
            "**/.history",
            "**/dist",
            "**/scripts",
            "**/coverage",
            "**/lang",
            "**/public/workbox-*.js.*",
            "**/public/workbox-*.js",
            "**/public/sw.js",
            "**/public/login/*.*",
            "**/public/sw.js.*",
            "**/public/fallback-*.js",
            "**/public/service-worker.js",
            "**/.husky",
            "**/.idea",
            "**/eslint.config.mjs",
            "**/eslint-extend.mjs",
            "**/apollo.config.js",
            "**/graphql.config.js",
            "**/next-env.d.ts",
            "**/next.config.ts",
            "**/next.config.js",
            "server/**/*",
            "eslint-typegen.d.ts",
            "**client/__tests__/**",
            "**/src/app/favicon.ico"
        ],
    }, ...fixupConfigRules(compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:i18next/recommended",
        "plugin:react-hooks/recommended",
    )), {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            "@next/next": pluginNext,
            react: fixupPluginRules(react),
            "@typescript-eslint": fixupPluginRules(typescriptEslint),
            "jsx-a11y": fixupPluginRules(jsxA11Y),
            "react-hooks": fixupPluginRules(reactHooks),
        },
    
        languageOptions: {
            globals: {},
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: "module",
    
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                // Enable type-aware linting using the Project Service (TS-ESLint v8)
                projectService: true,
                // Ensure tsconfig is resolved relative to this config file (avoids Unicode path normalization issues on macOS)
                tsconfigRootDir: __dirname,
            },
        },
    
        settings: {
            react: {
                version: "detect",
            },
        },
    
        rules: {
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs['core-web-vitals'].rules,
            "i18next/no-literal-string": [
            'error', {
                'markupOnly': true,
                'onlyAttribute': ['foo'],
                "ignoreCallee": ["foo"],
                "ignoreProperty": ["foo"]
                }
            ],
            "jsx-a11y/no-autofocus": [2, {
                ignoreNonDOM: true,
            }],
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-interface": 0,
            "no-empty-pattern": 0,
            "@typescript-eslint/explicit-member-accessibility": 0,
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-var-requires": 0,
            "react/prop-types": 0,
            "react/jsx-key": [1, {
                checkFragmentShorthand: true,
            }],
    
            "no-console": 1,
            "formatjs/enforce-default-message": 0,
            "@typescript-eslint/switch-exhaustiveness-check": "error",
            "react/display-name": 0,
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            'react-hooks/set-state-in-effect': 'off',
            "@typescript-eslint/explicit-module-boundary-types": "off",
    
            "prefer-const": ["error", {
                destructuring: "any",
                ignoreReadBeforeAssign: false,
            }],
        },
    },
    // Ensure JS config files and other non-TS files don't use the TS parser with projectService
    {
        files: ["**/*.{js,mjs,cjs}", "**/*.jsx"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
        },
    }
]

export default typegen(config);