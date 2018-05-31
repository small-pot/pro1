const path = require('path');
const webpack=require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer=require('autoprefixer')
const isPro=process.env.NODE_ENV === 'production';
const glob=require('glob');
function getEntries(){
    const obj={};
    glob.sync('src/js/entry/*.js').forEach((val)=>{
        obj[path.basename(val).replace(/\.js$/,'')]='./'+val;
    })
    return obj;
}
function getHtml(){
    return glob.sync('src/views/*.html').map((val)=>{
        const filename=path.basename(val).replace(/\.html$/,'');
        return new HtmlWebpackPlugin({
            filename:filename+'.html',
            template:'./'+val,
            inject:true,
            chunks:isPro?['vendor','runtime',filename]:[filename],
            minify: isPro?{
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }:false,
            chunksSortMode: 'dependency'
        })
    })
}
const cssLoader = [
    {
        loader: 'css-loader',
        options: {
            minimize: isPro
        }
    },
    {loader: "postcss-loader"}
];
function use (loaders){
    return [isPro?MiniCssExtractPlugin.loader:{loader:'style-loader'},...loaders]
}
module.exports = {
    entry:getEntries(),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'[name].js',
        publicPath:'/'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                include: [path.join(__dirname,'src')],
                loader: 'babel-loader'
            },
            {
                test:/\.css$/,
                include: [path.join(__dirname,'src')],
                use:use(cssLoader)
            },
            {
                test: /\.less$/,
                include: [path.join(__dirname,'src')],
                use:use([...cssLoader,{loader: "less-loader"}])
            },
            {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                test: /\.html$/,
                loader: "html-loader?attrs=img:src img:data-src"
            },
            {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
                //图片加载器，可以将较小的图片转成base64，减少http请求，将小于8192byte的图片转成base64码
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins:[
        new webpack.LoaderOptionsPlugin({
            options:{postcss:[autoprefixer()]}
        }),
        ...getHtml()
    ]
};