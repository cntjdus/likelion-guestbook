import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 커스텀 도메인(likekion-guestbook.o-r.kr)에서 루트(/)로 서빙되므로 base는 "/"
  base: "/",
});
