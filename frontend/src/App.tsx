import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {client} from './eden'

function App() {
    const [count, setCount] = useState(0)

    const [data, setData] = useState<string | null>(null)

    const fetchBackend = async () => {
        const {data} = await client.api.ping.get()
        setData(data)
    }

    return (
        <>
            <section id="center">
                <div className="hero">
                    <img src={heroImg} className="base" width="170" height="179" alt=""/>
                    <img src={reactLogo} className="framework" alt="React logo"/>
                    <img src={viteLogo} className="vite" alt="Vite logo"/>
                </div>
                <div>
                    <h1>Get started</h1>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
                    </p>
                </div>
                <button
                    className="counter"
                    onClick={() => setCount((count) => count + 1)}
                >
                    Count is {count}
                </button>
                <button onClick={fetchBackend}>
                    Ping Backend with Eden Treaty
                </button>
                {data && (
                    <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
                        {data}
                    </p>
                )}
            </section>

            <div className="ticks"></div>


            <div className="ticks"></div>
            <section id="spacer"></section>
        </>
    )
}

export default App
