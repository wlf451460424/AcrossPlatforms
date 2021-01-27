const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
					{ from:  path.resolve(__dirname, '.well-known'), to: path.resolve(__dirname, 'dist/build/h5', '.well-known'),force:true },
					{ from:  path.resolve(__dirname, '.well-known/Z2WAgrkavP.txt'), to: path.resolve(__dirname, 'dist/build/h5/Z2WAgrkavP.txt'),force:true },
					{ from:  path.resolve(__dirname, '.well-known/vAOnZZJy7s.txt'), to: path.resolve(__dirname, 'dist/build/h5/vAOnZZJy7s.txt'),force:true },
					{ from:  path.resolve(__dirname, '.well-known/qq_e3e609a857a7946d36a6126e0fc28125.txt'), to: path.resolve(__dirname, 'dist/build/h5/qq_e3e609a857a7946d36a6126e0fc28125.txt'),force:true },
					{ from:  path.resolve(__dirname, '.well-known/bd_mapp_domaincer_23065538.txt'), to: path.resolve(__dirname, 'dist/build/h5/bd_mapp_domaincer_23065538.txt'),force:true },
					{ from:  path.resolve(__dirname, 'src/pages/Z2WAgrkavP.txt'), to: path.resolve(__dirname, 'dist/build/h5/pages/Z2WAgrkavP.txt'),force:true },
					{ from:  path.resolve(__dirname, 'src/pages/post/Z2WAgrkavP.txt'), to: path.resolve(__dirname, 'dist/build/h5/pages/post/Z2WAgrkavP.txt'),force:true },
					{ from:  path.resolve(__dirname, 'src/pages/user/Z2WAgrkavP.txt'), to: path.resolve(__dirname, 'dist/build/h5/pages/user/Z2WAgrkavP.txt'),force:true }
                ]
            }),
        ],
		optimization: {
			minimize: true,
		},
    }
}
