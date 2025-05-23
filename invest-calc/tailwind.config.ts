/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#24C3F5', // Azul principal
                secondary: '#1A8CD8', // Azul escuro para hover
                accent: '#F5F9FF', // Fundo de cards e seções
                muted: '#e5e7eb', // Cinza claro para bordas
                dark: '#222', // Texto principal
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                xl: '1rem',
                lg: '0.75rem',
            },
            boxShadow: {
                card: '0 2px 12px 0 rgba(36, 195, 245, 0.08)',
                soft: '0 1.5px 8px 0 rgba(36, 195, 245, 0.06)',
            },
            container: {
                center: true,
                padding: '1rem',
            },
        },
    },
    plugins: [],
};
