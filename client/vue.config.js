const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/auth': {
        target: 'http://localhost:5000'
      },
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  }
}