const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#FF8A00',
              '@font-size-base': '14px', // major text font size
              '@text-color': '#5C5C5C', // major text color
              '@text-color-secondary': '#FFFFFF', // secondary text color
              '@disabled-color': '#C4C4C4', // disable state color
              '@border-radius-base': '8px' // major border radius
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
