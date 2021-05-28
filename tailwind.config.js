module.exports = {
    mode: "jit",
    purge: [],
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class",
    theme: {
        fontWeight: {
            normal: 400,
            semibold: 600,
            bold: 700,
        },
        extend: {},
    },
    plugins: [],
    corePlugins: {
        fontFamily: false,
    },
};
