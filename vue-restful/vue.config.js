module.exports = {
	devServer: {
		proxy: 'http://localhost',
	  	port: 8000
	},
	configureWebpack: {
		devServer: {
		  headers: { "Access-Control-Allow-Origin": "http://localhost:3000" }
		}
	}	
}
  