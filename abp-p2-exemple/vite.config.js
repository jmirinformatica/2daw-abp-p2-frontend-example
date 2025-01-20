import { defineConfig,loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {

     plugins: [react()],
      server: {
        host:true
      },
      define: {
          'process.env.API_URL': JSON.stringify(env.API_URL),
          
          // If you want to exposes all env variables, which is not recommended
          // 'process.env': env
      },
  };
});