const { composePlugins, withNx } = require('@nx/webpack');
const FileManagerPlugin = require('filemanager-webpack-plugin');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = composePlugins(withNx(), (config, { _options, context }) => {
  config.plugins = config.plugins || [];
  const environment = context.configurationName || undefined;

  if (environment) {
    config.plugins.push(
      new FileManagerPlugin({
        events: {
          onEnd: {
            copy: [
              {
                source: 'src/assets/emails',
                destination: `dist/${environment}/assets/emails`,
              },
              {
                source: 'src/assets/images',
                destination: `dist/${environment}/assets/images`,
              },
            ],
          },
        },
        runTasksInSeries: true,
      })
    );
  }

  return config;
});
