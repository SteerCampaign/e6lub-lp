const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
    // mode: 'production',
    mode: 'development',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/app.bundle.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.scss$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].scss' : 'assets/css/[name].[hash].css',
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/pharmacy/index.twig',
            filename: "pharmacy.html"
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/lmd/index.twig',
            filename: "lmd.html"
        }),
        new CopyPlugin([
            { from: './src/assets/images', to: './assets/images' },
        ]),
        new CopyPlugin([
            { from: './src/assets/fonts', to: './assets/fonts' },
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
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
                            name: '../../assets/images/[name].[ext]',
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
                    name: '[name].[ext]',
                    outputPath: '/assets/fonts',
                },
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg']
    }
};