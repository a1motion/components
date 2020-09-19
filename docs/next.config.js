const withFonts = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;

      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      const assetPrefix = nextConfig.assetPrefix || "";

      const enableSvg = nextConfig.enableSvg || false;

      const limit = nextConfig.inlineFontLimit || 8192;

      let testPattern = /\.(woff|woff2|eot|ttf|otf)$/;

      if (enableSvg) {
        testPattern = /\.(woff|woff2|eot|ttf|otf|svg)$/;
      }

      config.module.rules.push({
        test: testPattern,
        // issuer: {
        //   // Next.js already handles url() in css/sass/scss files
        //   test: /\.\w+(?<!(s?c|sa)ss)$/i,
        // },
        use: [
          {
            loader: require.resolve("url-loader"),
            options: {
              limit,
              fallback: require.resolve("file-loader"),
              publicPath: `${assetPrefix}/_next/static/chunks/fonts/`,
              outputPath: `${isServer ? "../" : ""}static/chunks/fonts/`,
              name: "[name]-[hash].[ext]",
            },
          },
        ],
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

const path = require("path");
const withTM = require("next-transpile-modules")(["ky", "react-feather"]);
const withCSS = require("@zeit/next-css");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("rehype-docz")],
  },
});

function compose(...plugins) {
  return (options) => {
    return plugins.reduce((a, b) => {
      return b(a);
    }, options);
  };
}

module.exports = compose(
  withCSS,
  withFonts,
  withMDX,
  withTM
)({
  experimental: {
    workerThreads: true,
    modern: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  devIndicators: {
    autoPrerender: false,
  },
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
});
