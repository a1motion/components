module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-linaria",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        rehypePlugins: [require("rehype-docz")],
      },
    },
    "gatsby-transformer-remark",
  ],
};
