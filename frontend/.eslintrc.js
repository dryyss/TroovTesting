module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  rules: {
    'space-before-function-paren': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
  },
}
