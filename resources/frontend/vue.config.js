const path = require("path");
const packageJSON = require("./package.json");
const environment = process.env.NODE_ENV || "production";

module.exports = {
    // output built static files to Laravel's public dir.
    // note the "build" script in package.json needs to be modified as well.
    outputDir: '../../public',

    publicPath: '/',

    // modify the location of the generated HTML file.
    indexPath: process.env.NODE_ENV === 'production'
        ? '../resources/views/index.blade.php'
        : 'index.html',
    configureWebpack: {
        resolve: {
            alias: {
                'window': 'window',
                'vue$': 'vue/dist/vue.js',
                'environment': path.resolve(__dirname, 'src/config/environment/Resources.ts')
            }
        }
    },
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.plugin("define").tap((definitions) => {
            definitions[0] = Object.assign(definitions[0], {
                "process.env.RESOURCE": JSON.stringify(packageJSON.resource[environment])
            });

            return definitions;
        });
    }
};
