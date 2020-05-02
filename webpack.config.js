const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'
const minifySettings =  {
    html5                          : true,
    collapseWhitespace             : true,
    minifyCSS                      : true,
    minifyJS                       : true,
    minifyURLs                     : false,
    removeAttributeQuotes          : true,
    removeComments                 : true,
    removeEmptyAttributes          : true,
    removeOptionalTags             : true,
    removeRedundantAttributes      : true,
    removeScriptTypeAttributes     : true,
    removeStyleLinkTypeAttributese : true,
    useShortDoctype                : true
};

module.exports = {    
    entry: {
        index: './src/index.js',
        pharmacy: './src/pharmacy.js',
        lmd: './src/lmd.js',
        drivers: './src/drivers.js',
        groceries: './src/groceries.js',
        bulk: './src/bulk.js',
        thanks: './src/thanks.js',
        lmd_english: './src/lmd-english.js',
        drivers_english: './src/drivers-english.js',
        faqs: './src/faqs.js',
    },
    output: {
        filename: 'assets/js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[id].[chunkhash].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].scss' : 'assets/css/[name].[hash].css',
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/groceries/index.twig',
            filename: "groceries.html",
            minify: minifySettings,
            chunks: ['groceries']
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/pharmacy/index.twig',
            filename: "pharmacy.html",
            minify: minifySettings,
            chunks: ['pharmacy'],
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/lmd/index.twig',
            filename: "lmd.html",
            minify: minifySettings,
            chunks: ['lmd']
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/faqs/index.twig',
            filename: "faqs.html",
            minify: minifySettings,
            chunks: ['faqs']
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/lmd-english/index.twig',
            filename: "lmd-english.html",
            minify: minifySettings,
            chunks: ['lmd_english']
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/drivers-english/index.twig',
            filename: "drivers-english.html",
            minify: minifySettings,
            chunks: ['drivers_english']
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/bulk/index.twig',
            filename: "bulk.html",
            minify: minifySettings,
            chunks: ['bulk']
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/thanks/index.twig',
            filename: "thank-you.html",
            minify: minifySettings,
            chunks: ['thanks']
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/index/index.twig',
            filename: "index.html",
            minify: minifySettings,
            chunks: ['index'],
            options: {'link': 'https://now.e6lub.com/'}
        }),
        new HtmlWebPackPlugin({
            template: './src/view/components/drivers/index.twig',
            filename: "drivers.html",
            minify: minifySettings,
            chunks: ['drivers']
        }),
        new CopyPlugin([
            { from: './src/assets/images', to: './assets/images' },
        ]),
        new CopyPlugin([
            { from: './src/assets/fonts', to: './assets/fonts' },
        ]),
        new CopyPlugin([
            { from: './src/statics', to: './' },
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
                    outputPath: '../../assets/fonts',
                },
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg']
    }
};