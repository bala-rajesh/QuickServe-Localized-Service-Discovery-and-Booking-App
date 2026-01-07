/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#4A90E2",
                "secondary": "#50E3C2",
                "Decline": "#fa2323",
                "background-light": "#F4F7FA",
                "background-dark": "#101922",
                "text-light": "#2C3E50",
                "text-dark": "#F4F7FA",
                "border-light": "#AAB8C2",
                "border-dark": "#2C3E50",
                "card-light": "#FFFFFF",
                "card-dark": "#1A2836"
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "0.75rem",
                "xl": "1rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}
