module.exports = {
  "presets": [
    process.env.NODE_ENV === 'test' && "@babel/preset-env",
    "@babel/preset-react",
    "linaria/babel",
    "@babel/preset-typescript"
  ].filter(Boolean)
};