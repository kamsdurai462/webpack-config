const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SOURCE_ROOT = `${__dirname}/src/`;
let mode = "development";
if(process.env.NODE_ENV === "production"){
    mode = "production";
};
module.exports = {
    entry :{
        bundle: SOURCE_ROOT + 'index.js',
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].js',
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[MiniCssExtractPlugin.loader,"css-loader"],
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use :{
                    loader:"babel-loader",
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    mode: 'development',
    devtool : "source-map",
    devServer: {
        static: './dist',
        hot:true,
        open: true
    }
};