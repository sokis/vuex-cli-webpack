// ======================================================
// NODE_ENV === 'development'
// ======================================================

var config = require('vuex-cli-webpack/lib/config')

module.exports = {
  proxy: {
    enabled: false,
    options: {
      host: null,
      match: /^\/api\/.*/
    }
  }
}
