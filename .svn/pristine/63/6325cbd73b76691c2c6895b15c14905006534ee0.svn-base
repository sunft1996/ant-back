const CopyWebpackPlugin = require('copy-webpack-plugin');

const argv = require('yargs').argv.newPage;

function transform(content, path) {
  const oldContent = content.toString('utf8');
  const newContent = oldContent.replace(/demo/g, argv);

  return Buffer.from(newContent);
}

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/pages/Demo/Demo.js', to: `${__dirname  }/src/pages/${argv}/${argv}.js`, transform },
      { from: 'src/models/demo.js', to: `${__dirname  }/src/models/${argv}.js`, transform },
      { from: 'src/services/demo.js', to: `${__dirname  }/src/services/${argv}.js`, transform },
    ])
  ]
};