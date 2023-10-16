const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin    = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, "src"),
    entry: './index.js', //ENTRYPOINTの指定
    devtool: "hidden-source-map", //ソースマップの作成を指定

    output: {
        // 出力ファイルのディレクトリ名
        path: `${__dirname}/dist`,
        clean: {
            keep: /index.html/, //指定したファイルを削除しないように設定する。
        }
    },

    watchOptions: {
        //ignored: /node_modules/ //watchオプションを指定してビルドした場合の監視対象からの除外
    },

    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    //"style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            //出力先の設定
            filename: './css/[name].css',
        }),

        new HtmlWebpackPlugin({
            //対象のテンプレートを設定
            template: `${__dirname}/src/index.html`,
            //書き出し先
            filename: `${__dirname}/dist/index.html`,       
        })
    ]
}