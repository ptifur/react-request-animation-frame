import './App.css'
import Board from './components/Board'
import Header from './components/Header'
import { useState } from 'react'

function App() {

    const [muted, setMuted] = useState(false)

    return (
        <div className="wrapper">
            <Header muted={muted} onChange={setMuted} />
            <Board muted={muted} />
        </div>
    )
}

export default App