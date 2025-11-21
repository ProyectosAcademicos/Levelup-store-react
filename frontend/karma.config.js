module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-webpack",
      "karma-jasmine-html-reporter"
    ],

    files: [
      "node_modules/jasmine-core/lib/jasmine-core/jasmine.js",
      "node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js",
      "node_modules/jasmine-core/lib/jasmine-core/boot0.js",
      "node_modules/jasmine-core/lib/jasmine-core/boot1.js",

      "setup.js",

      { pattern: "src/**/*.jsx", included: false, watched: true },
      { pattern: "test/**/*.spec.jsx", watched: true }
    ],


    preprocessors: {
      "test/**/*.spec.jsx": ["webpack"],
      "src/**/*.jsx": ["webpack"],
    },

    webpack: {
      mode: "development",
      resolve: {
        extensions: [".js", ".jsx"],
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-react"
                ],
              },
            },
          },
        ],
      },
    },

    reporters: ["progress", "kjhtml"],

    browsers: ["ChromeHeadless"],
    singleRun: true,
  });
};
