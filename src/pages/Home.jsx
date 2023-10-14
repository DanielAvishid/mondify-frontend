import { Icon } from "monday-ui-react-core"
import { useNavigate } from "react-router-dom"
import { MoveArrowRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"



export function Home() {

    const navigate = useNavigate()

    return (
        <section className="home-page">
            <header className="flex justify-between align-center">
                <div>Logo</div>
                <div className="flex align-center">
                    <div>
                        <a href="/board">Log in</a>
                    </div>
                    <button className="flex align-center justify-center" onClick={() => navigate('/board/#')}>
                        <span>Get Started</span>
                        <Icon icon={MoveArrowRight} iconSize="14" />
                    </button>
                </div>
            </header>
            <div className="first-container flex justify-center align-center column">
                <div className="flex justify-center align-center column">
                    <h1>
                        <span>A platform built for a <br /> new way of working</span>
                    </h1>
                    <h2>What would you like to manage with monday.com Work OS?</h2>
                </div>

                <div className="flex justify-center align-center column">
                    {/* <span>--Topics--</span> */}
                    <div>
                        <button className="flex align-center justify-center" onClick={() => navigate('/board/#')}>
                            <span>Get Started</span>
                            <Icon icon={MoveArrowRight} iconSize="18" />
                        </button>
                    </div>
                    <p>No credit card needed   ✦    Unlimited time on Free plan</p>
                </div>

            </div>
        </section>
    )
}