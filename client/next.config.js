const { builtinModules } = require("module");

module.exports = {
  compress: true,
  images: {
    domains: [
      // "upload.amamov.com",
    ],
  },
  webpack(config, { webpack }) {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    };
  },
};
