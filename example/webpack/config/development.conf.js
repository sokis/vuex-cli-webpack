// ======================================================
// Overrides when NODE_ENV === 'development'
// ======================================================
module.exports = config => ({
  compiler_public_path: '/',
  compiler_devtool: 'eval'
})
