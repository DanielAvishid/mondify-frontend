import { Icon } from "monday-ui-react-core"
import { useNavigate } from "react-router-dom"
import { MoveArrowRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import imgUrl from '../assets/img/monday-img.png'



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
                    <div className="flex">
                        <div className="selectable-cluster flex align-center column">
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <span>Sales & CRM</span>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <span>Creative & design</span>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <span>Software development</span>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <span>Project management</span>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <span>Task management</span>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <span>Marketing</span>
                        </div>
                    </div>
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