'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMessage(data.message);
    if (res.ok) {
      router.push('/coordinadores');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Usuario"
          className="w-full p-2 mb-3 border rounded hover:bg-yellow-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-3 border rounded hover:bg-yellow-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href="/coordinadores">
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-800"
          >
            Login
          </button>
        </Link>
        {message && <p className="mt-3 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}