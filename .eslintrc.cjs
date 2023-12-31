module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:tailwindcss/recommended',
    'next',
    'google',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: './',
  },
  plugins: [
      'react-refresh',
      '@tanstack/query',
  ],
  settings: {
    'react': {
      'version': 'detect'
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'indent': ['error', 4],
    'max-len': ['error', {
      'ignoreStrings': true,
      'ignoreComments': true,
    }],
    'linebreak-style': 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
  },
  ignorePatterns: [
    'dist/',
    'src/components/ui/*',
    '.eslintrc.cjs',
    '*env.d.ts',
    'main.tsx',
    '*config*',
    '*.md',
  ],
}
