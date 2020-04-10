const path = require("path");
const withTM = require("next-transpile-modules")(["ky"]);
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("rehype-docz")],
  },
});

module.exports = withFonts(
  withCSS(
    withMDX(
      withTM({
        experimental: {
          workerThreads: true,
          modern: true,
        },
        reactStrictMode: true,
        poweredByHeader: false,
        pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
        webpack(config) {
          config.module.rules[0].include.push(path.join(__dirname, ".."));
          config.resolve.alias["@a1motion/components$"] = path.join(
            __dirname,
            "..",
            "src"
          );
          config.module.rules.push({
            test: /\.(js|jsx|ts|tsx)$/,
            use: [
              {
                loader: "linaria/loader",
                options: {
                  sourceMap: process.env.NODE_ENV !== "production",
                },
              },
            ],
          });
          return config;
        },
      })
    )
  )
);
