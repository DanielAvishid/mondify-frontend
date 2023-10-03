import { useNavigate } from "react-router-dom"


export function Home() {

    const navigate = useNavigate()

    return (
        <section>
            <h1>Home</h1>
            <button onClick={() => navigate('/board/#')}>Get Started</button>
        </section>
    )
}