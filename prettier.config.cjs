module.exports = {
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    endOfLine: "crlf",
    bracketSpacing: true,
    bracketSameLine: true,
    jsxSingleQuote: false,
    quoteProps: "as-needed",
    arrowParens: "avoid",
    embeddedLanguageFormatting: "off",
    proseWrap: "never",
    insertPragma: false,
    overrides: [
        {
            files: "**/*.html",
            options: {
                singleAttributePerLine: false,
                htmlWhitespaceSensitivity: "css",
            },
        },
        {
            files: "**/*.ts",
            options: {
                trailingComma: "all",
                printWidth: Number.MAX_VALUE,
            },
        },
        {
            files: ["**/eslint.config.mjs", "**/prettier.config.cjs"],
            options: {
                trailingComma: "all",
            },
        }
    ],
};
