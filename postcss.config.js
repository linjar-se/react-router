module.exports = ({ env }) => ({
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        env === 'production' ? require('cssnano')({ preset: 'default' }) : false,
    ]
})