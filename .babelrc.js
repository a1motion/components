module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          node: "current",
        },
      },
    ],
    [
      "@babel/preset-react",
      {
        // runtime: 'automatic',
        development: process.env.NODE_ENV !== "production",
        useBuiltIns: true,
      },
    ],
    "linaria/babel",
    "@babel/preset-typescript",
  ].filter(Boolean),
};
