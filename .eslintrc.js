module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/base'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        'semi': [
            2,
            'always'
        ],
        'indent': 'off',
        'space-before-function-paren': [
            'error', {'anonymous': 'ignore', 'named': 'never'}
        ],
        'generator-star-spacing': 'off',
        'no-mixed-operators': 'off',
        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off'
    }
};
