
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
    },
  extends: [
        "plugin:vue/recommended",
        "eslint:recommended",
        "prettier/vue",
        "plugin:prettier/recommended"
    ],
  rules: {
        "vue/component-name-in-template-casing": [
            "error",
            "PascalCase"
        ],
        "no-console": process.env.NODE_ENV === "production" ? "error": "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error": "off",
        "no-return-assign": [
            "error",
            "except-parens"
        ],
        "no-unused-vars": [
            1,
            {
                "ignoreSiblings": true,
                "argsIgnorePattern": "res|next|^err"
            }
        ],
        "prefer-const": [
            "error",
            {
                "destructuring": "all",
            }
        ],
        "quotes": [
            2,
            "single",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ],
        "prettier/prettier": [
            "error",
            {
                "trailingComma": "es5",
                "singleQuote": true,
                "printWidth": 80,
            }
        ],
    },
  globals: {
    $nuxt: true
    },
  parserOptions: {
    parser: "babel-eslint"
    }
};