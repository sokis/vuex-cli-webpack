// ======================================================
// Overrides when NODE_ENV === 'production'
// ======================================================
module.exports = config => ({
  version: true,
  compiler_public_path: '',
  compiler_devtool: false,
  compiler_hash_type: 'chunkhash',
  compiler_html_minify: true
})