import { Icon } from "monday-ui-react-core"
import { MoveArrowRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Link } from "react-router-dom"

export function Signup() {
    return (
        <section className="sign-up">
            <div className="sign-up-container">
                <div className="content">
                    <div className="heading">
                        <h1 className="title">Welcome to workit</h1>
                        <h2 className="sub-title">Get started - it's free. No credit card needed.</h2>
                    </div>
                    <div className="sign-up-fields">
                        <div className="label-container">
                            <span className="label">
                                Username
                            </span>
                            <div className="input-container">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="label-container">
                            <span className="label">
                                Password
                            </span>
                            <div className="input-container">
                                <input type="text" />
                            </div>
                        </div >
                        <div className="label-container">
                            <span className="label">
                                Fullname
                            </span>
                            <div className="input-container">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="upload-btn-container">
                            <button className="upload-btn">
                                Upload avatar img
                            </button>
                        </div>
                        <button className="sign-up-btn">
                            <span className="btn-text">
                                Sign up
                            </span>
                            <Icon className="arrow-icon" icon={MoveArrowRight} />
                        </button>
                    </div>
                </div>
                <div className="login-container">
                    <div className="container">
                        <h5 className="login-title">Already have an account?</h5>
                        <Link className="flex align-center" to='/login'>
                            <span>
                                Log in
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="aside-img-container">
                <img src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/welcome-to-monday.png" alt="" />
            </div>
        </section>
    )
}