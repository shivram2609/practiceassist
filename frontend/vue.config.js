module.exports = {
	 devServer: { proxy: { '/api': { target: process.env.API_BASE_URL } } }
}

