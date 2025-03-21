const path = require('path');

module.exports = {
    entry: './assets/js/blocks-demo/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js/'),
        filename: 'blocks-demo.min.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    mode: 'production',
};