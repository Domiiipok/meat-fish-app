import { useTelegramAuth } from './useTelegramAuth'

export default function App() {
  useTelegramAuth() // ← вызываем хук

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold">Meat & Fish WebApp</h1>
      <p>Добро пожаловать в Telegram WebApp.</p>
    </div>
  )
}



import { useEffect } from 'react'



    const initData = tg.initData

    fetch(`${import.meta.env.VITE_API_URL}/auth/telegram`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ initData }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('[✅ AUTH]', data)
      })
      .catch(err => console.error('AUTH ERROR', err))
  }, [])
}

