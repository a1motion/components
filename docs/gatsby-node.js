const path = require(`path`);

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  actions.setWebpackConfig({
    devtool: stage.startsWith(`build`)
      ? `source-map`
      : `cheap-module-source-map`,
    resolve: {
      alias: {
        react: require.resolve(`react`),
        "@a1motion/components": path.join(__dirname, `..`),
      },
    },
  });
};
