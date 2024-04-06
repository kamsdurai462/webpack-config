const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const miniCssExtractPlugin = "mini-css-extract-plugin";

let mode = "development";
if(process.env.NODE_ENV === "production"){
    mode = "production";
};
module.exports = {
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
   plugins : [new MiniCssExtractPlugin()],
    mode: 'development',
    devtool : "source-map",
    devServer: {
        static: './dist',
        hot:true,
        open: true
    }
};