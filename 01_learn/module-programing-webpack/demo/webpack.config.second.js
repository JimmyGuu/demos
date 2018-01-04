const config = {
    // 单个入口
    // 是一种对象语法的简写
    entry: './path/to/my/entry/file.js',

    // 对象语法
    entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
    }
};

const config2 = {
    output: {
        filename: 'bundle.js',
        path: '/home/proj/public/assets'
    },

    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },

    output: {
        path: '/home/proj/cdn/assets/[hash]',
        publicPath: 'http://cdn.example.com/assets/[hash]/'
    }
}

const config3 = {
    modules: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { modules: true } }
                ]
            }
        ]
    }
}

import Styles from 'style-loader!css-loader?modules!./style.css';