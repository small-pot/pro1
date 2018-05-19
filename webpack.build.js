process.env.NODE_ENV = 'production';
const webpack=require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config=require('./webpack.base.config')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ora = require('ora');
const buildConfig=merge(config,{
    mode:'production',
    devtool:false,
    output: {
        filename:'js/[name].[chunkhash].js'
    },
    optimization:{
        splitChunks: {
            chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"
            name:"vendor"
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css"
        })
    ]
})
const spinner = ora('building for production...')
spinner.start()
webpack(buildConfig,(err,stats)=>{
    spinner.stop()
    if(err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')
})