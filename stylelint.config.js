/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard-scss'],
  overrides: [
    {
      files: ['**/*component.scss'], // Adjust the pattern to match your file(s)
      rules: {
        'no-empty-source': null, // Disable the rule for empty sources
      },
    },
  ],
  ignoreFiles: ['dist/**/*'],
};
