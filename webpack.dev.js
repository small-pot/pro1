const webpack=require('webpack');
const config=require('./webpack.base.config')
const merge = require('webpack-merge')
module.exports =merge(config,{
    mode:'development',
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port:9000,
        hot:true,
        compress:true,
        historyApiFallback:true
    }
});
