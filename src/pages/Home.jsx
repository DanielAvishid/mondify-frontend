import { Icon, Link } from "monday-ui-react-core"
import { useNavigate } from "react-router-dom"
import { MoveArrowRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import imgUrl from '../assets/img/monday-img.png'
import { useState } from "react"

export function Home() {

    const navigate = useNavigate()
    https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/monday-logo-x2.png
    return (
        <section className="home-page">
            <div className="header-container">
                <header className="header">
                    <div className="logo">
                        <img src={imgUrl} alt="" />
                        <span className="span">
                            mondify
                        </span>
                    </div>
                    <div className="get-started">
                        {/* <div className="login">
                        <a href="/board">Log in</a>
                    </div> */}
                        <button className="btn">
                            <span className="span">Get Started</span>
                            <Icon className="icon" icon={MoveArrowRight} iconSize="14" />
                        </button>
                    </div>
                </header>
            </div>
            <div className="hero">
                <div className="content">
                    <div className="main-title">
                        <h1>
                            A platform built for a new way of working
                        </h1>
                    </div>
                    <h2 className="sub-title">What would you like to manage with monday.com Work OS?</h2>
                </div>
                <div className="call-to-action">
                    <div className="cards-container">
                        <div className="card">
                            <div className="checkbox"></div>
                            <div className="cluster-img">
                                <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Home Page - 2022 Rebrand/first_fold/icons/design_icon.png' />
                            </div>
                            {/* <p>Sales & CRM</p> */}
                        </div>
                        {/* <div className="selectable-cluster flex align-center column">
                            <div className="checkbox"></div>
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <p>Creative & design</p>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="checkbox"></div>
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <p>Software development</p>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="checkbox"></div>
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <p>Project management</p>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="checkbox"></div>
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <p>Task management</p>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="checkbox"></div>
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <p>Marketing</p>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="checkbox"></div>
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <p>HR</p>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="checkbox"></div>
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <p>Operations</p>
                        </div>
                        <div className="selectable-cluster flex align-center column">
                            <div className="checkbox"></div>
                            <div className="cluster-img">
                                <img src={imgUrl} />
                            </div>
                            <p>More workflows</p>
                        </div> */}
                    </div>
                    {/* <div>
                        <button className="flex align-center justify-center" onClick={() => navigate('/board/#')}>
                            <span>Get Started</span>
                            <Icon icon={MoveArrowRight} iconSize="18" />
                        </button>
                    </div>
                    <p className="small-words">No credit card needed   ✦    Unlimited time on Free plan</p> */}
                </div>

            </div>
        </section>
    )
}