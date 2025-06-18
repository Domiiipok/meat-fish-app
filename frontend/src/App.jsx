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




