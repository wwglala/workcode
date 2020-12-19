module.exports = {
    "extends": ["stylelint-config-standard", "stylelint-config-rational-order"],
    "plugins": ["stylelint-order", "stylelint-declaration-block-no-ignored-properties"],
    "rules": {
        "comment-empty-line-before": null,
        "declaration-empty-line-before": null,
        "function-name-case": "lower",
        "no-descending-specificity": null,
        "no-invalid-double-slash-comments": null,
        "selector-pseudo-class-no-unknown": null    // 针对:global
    },
    "ignoreFiles": ["node_modules/**/*", "src/assets/**/*", "build/**/*"]
}