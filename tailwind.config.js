// ==========================================
// tailwind.config.js
// ==========================================
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                benin: {
                    green: '#00843D',
                    yellow: '#FCD116',
                    red: '#E8112D'
                }
            }
        },
    },
    plugins: [],
}
