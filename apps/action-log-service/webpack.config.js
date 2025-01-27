const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config, { _options, context }) => {
  return config;
});
