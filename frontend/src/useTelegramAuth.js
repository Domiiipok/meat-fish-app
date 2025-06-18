// src/useTelegramAuth.js ✅
import { useEffect } from 'react'

export function useTelegramAuth() {
  useEffect(() => {
    const tg = window.Telegram.WebApp

    if (!tg.initDataUnsafe?.user) {
      console.error('Telegram user not found')
      return
    }

    const initData = tg.initData  // ← только ОДИН раз

      fetch(`${import.meta.env.VITE_API_URL}/auth/telegram`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: tg.initData
  })
    .then(res => res.json())
    .then(data => console.log('[✅ AUTH]', data))
    .catch(err => console.error('AUTH ERROR', err))
}, []) // <-- ✅ Закрытие useEffect
