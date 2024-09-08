/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#FC4747",
                "dark-blue": "#10141E",
                white: "#FFFFFF",
                "greyish-blue": "#5A698F",
                "semi-dark-blue": "#161D2F",
            },
        },
    },
    plugins: [],
};
