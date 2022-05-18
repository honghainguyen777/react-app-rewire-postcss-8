module.exports = function (config, additionalPlugins) {
  // find any first matching rule that contains postcss-loader
  filterPostCSSLoader(config.module.rules).forEach((rule) => {
    filterPostCSSLoader(rule.oneOf).forEach((oneOf) => {
      filterPostCSSLoader(oneOf.use || oneOf.loader).forEach((use) => {
        // use the latest version of postcss-loader
        use.loader = require.resolve('postcss-loader');

        // change use.options.plugins to use.options.postcssOptions.plugins -> for supporting PostCSS 8
        use.options.postcssOptions.plugins = [ ...use.options.postcssOptions.plugins, ...additionalPlugins ];
      });
    });
  });

  // return the mutated configuration
  return config;
};

// return a filtered array that includes postcss-loader
const filterPostCSSLoader = array => array.filter(object => JSON.stringify(object).includes('postcss-loader'));
