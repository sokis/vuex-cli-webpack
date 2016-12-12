// ======================================================
// Overrides when NODE_ENV === 'production'
// ======================================================
export default config => ({
	compiler_public_path: '/',
	compiler_devtool: null,
	compiler_hash_type: 'chunkhash',
	compiler_html_minify: true
})
