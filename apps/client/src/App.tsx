import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ENV } from './config/env';

function App() {
  const [count, setCount] = useState(0)

  const [status, setStatus] = useState("");

  useEffect(() => {
    const url = `${ENV.VITE_API_URL}/api/v1/health`;

    const APIHealthCheck = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error("There was an error", error);
      }
    };

    APIHealthCheck();
  }, []);

  return (
    <>
      <div className='flex justify-around'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2 className="text-2xl">API health check</h2>
        <p>Status: {status}</p>
      </div>
    </>
  )
}

export default App
