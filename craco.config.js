const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#F6A13A',
              '@font-size-base': '14px', // major text font size
              '@font-weight-base': '500',
              '@text-color': '#000000', // major text color
              '@text-color-secondary': '#BDBDBD', // secondary text color
              '@disabled-color': '#BDBDBD', // disable state color
              '@border-radius-base': '10px', // major border radius
              '@input-height-base': '48px',
              '@input-height-lg': '48px',
              '@border-color-base': '#F6A13A',
              '@btn-default-color': '#F6A13A'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
