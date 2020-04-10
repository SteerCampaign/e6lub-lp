const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
    mode: 'production',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].scss' : 'assets/css/[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].scss' : 'assets/css/[id].[hash].css'
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/index.twig',
            filename: "index.html"
        }),
        new CopyPlugin([
            { from: './src/assets/images', to: './assets/images' },
        ]),
    ],
    module: {
        rules: [
            {
                test: /\style\.s(a|c)ss$/,
                loader: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: isDevelopment,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.style.(s(a|c)ss)$/,
                loader: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.twig$/,
                use: [
                    'raw-loader',
                    {
                        loader: 'twig-html-loader',
                        options: {
                            namespaces: {
                                'layouts': path.join(__dirname, 'src/view', 'layouts'),
                                'components': path.join(__dirname, 'src/view', 'components'),
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../../[path][name].[ext]',
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                optipng: {
                                    enabled: !isDevelopment
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false
                                },
                                webp: {
                                    quality: 75
                                },
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/fonts',
                },
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg']
    }
};