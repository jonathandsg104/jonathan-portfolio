import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2021, // Suporte para ES2021
        sourceType: "module", // Para usar 'import/export'
        ecmaFeatures: {
          jsx: true, // Suporte ao JSX
        },
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      js, 
      "@typescript-eslint": tseslint,
      react: pluginReact,
    },
    extends: [
      "js/recommended", // Configuração recomendada para JS
      "plugin:@typescript-eslint/recommended", // Regras para TypeScript
      "plugin:react/recommended", // Regras recomendadas para React
      "plugin:prettier/recommended", // Integração com Prettier
    ],
    rules: {
      "prettier/prettier": "error", // Garante formatação consistente
      "@typescript-eslint/no-unused-vars": ["warn"], // Variáveis não usadas como aviso
      "react/react-in-jsx-scope": "off", // Não obrigatório no React 17+
      "no-console": "warn", // Aviso ao usar console.log
    },
    settings: {
      react: {
        version: "detect", // Detecta automaticamente a versão do React
      },
    },
  },
]);