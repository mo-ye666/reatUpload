const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');  //用于访问内置组件
const path = require('path')

module.exports = {
    entry:'./src/index.tsx',
    resolve:{
        extensions:['.js','.ts','.tsx']
    },
    output: {
        path:resolve(__dirname,'build'),
        filename:'[name].[contenthash].bundle.js'
    },
    module:{
        rules:[
            {test:/\.css$/, use:['style-loader','css-loader']},
            {test:/\.ts$/, use:'ts-loader' },
            {test: /\.html$/, use: 'html-loader' },
            {test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']},
            {
                test:/\.tsx?/,
                use:[{
                    loader:'babel-loader',
                    options: {
                        presets:['@babel/preset-react','@babel/preset-typescript']
                    }
                }]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./index.html'}),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        compress:true,
        port:9000,
        hot:true,
        open:true,
    },
    mode:'development',
}