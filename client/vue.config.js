const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      // These two might not be needed?
      '/api': {
        target: 'http://localhost:5000'
      },
      '/custom': {
        target: 'http://localhost:5000'
      }
    }
  }
}