import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: process.env.REACT_APP_BACKEND_URL,
                changeOrigin: true,
            },
        },

    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './testSetup.js',
    }
})
