// .prettierrc.js
module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
};
