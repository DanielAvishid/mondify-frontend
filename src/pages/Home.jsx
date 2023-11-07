import { Icon, Link } from "monday-ui-react-core"
import { useNavigate } from "react-router-dom"
import { MoveArrowRight, Check } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import imgUrl from '../assets/img/monday-img.png'
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

export function Home() {

    const [isHeroBtnHover, setIsHeroBtnHover] = useState(false)
    const [isCardHover, setIsCardHover] = useState([false, false, false, false, false, false, false, false, false])
    const [isCardChecked, setIsCardChecked] = useState([false, false, false, false, false, false, false, false, false])
    const [cardsColorsBtn, setCardsColorsBtn] = useState([])
    const [isScale, setIsScale] = useState(false)
    const [isScroll, setIsScroll] = useState(false)
    const [hoverCardsColorsBtn, setHoverCardsColorsBtn] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 0) {
                setIsScroll(true)
            } else setIsScroll(false)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleCardClick)
        }
    }, [])

    const scale = isScale ? 1.05 : 1;

    const cardsTitles = ['Creative & design', 'Software development', 'Marketing', 'Project management', 'Sales & CRM', 'Task management', 'HR', 'Operations', 'More workflows']

    const cardsColors = [{ color: '#ff158a', idx: 0 }, { color: '#00c875', idx: 1 }, { color: '#f04095', idx: 2 }, { color: '#ff9900', idx: 3 }, { color: '#00d2d2', idx: 4 }, { color: '#579bfc', idx: 5 }, { color: '#ff7575', idx: 6 }, { color: '#4eccc6', idx: 7 }, { color: '#6161ff', idx: 7 }]

    const hoverCardsColors = [{ color: '#d51273', idx: 0 }, { color: '#00a762', idx: 1 }, { color: '#c9367d', idx: 2 }, { color: '#d58000', idx: 3 }, { color: '#00b0b0', idx: 4 }, { color: '#4982d3', idx: 5 }, { color: '#d56262', idx: 6 }, { color: '#41aba6', idx: 7 }, { color: '#5151d5', idx: 7 }]

    const cardsIcon = utilService.getHeroIcons()
    const companiesLogos = utilService.getLogos()

    function handleCardClick(idx, value) {
        isCardChecked[idx] = !value
        const newCheckedArray = [...isCardChecked]
        setIsCardChecked(newCheckedArray)
        setIsScale(true)
        setTimeout(() => {
            setIsScale(false);
        }, 200);

        if (!value) {
            cardsColorsBtn.push(cardsColors[idx])
            cardsColorsBtn.sort((a, b) => a.idx - b.idx)
            hoverCardsColorsBtn.push(hoverCardsColors[idx])
            hoverCardsColorsBtn.sort((a, b) => a.idx - b.idx)
            const newColorsArray = [...cardsColorsBtn]
            const newHoverColorsArray = [...hoverCardsColorsBtn]
            setCardsColorsBtn(newColorsArray)
            setHoverCardsColorsBtn(newHoverColorsArray)
        } else if (value && cardsColorsBtn.length === 1) {
            setCardsColorsBtn([])
            setHoverCardsColorsBtn([])
        } else {
            const colorIdx = cardsColorsBtn.findIndex(color => color.idx === idx)
            cardsColorsBtn.splice(colorIdx, 1)
            const hoverColorIdx = hoverCardsColorsBtn.findIndex(color => color.idx === idx)
            hoverCardsColorsBtn.splice(hoverColorIdx, 1)
            const newColorsArray = [...cardsColorsBtn]
            const newHoverColorsArray = [...hoverCardsColorsBtn]
            setCardsColorsBtn(newColorsArray)
            setHoverCardsColorsBtn(newHoverColorsArray)
        }
    }

    function handleMouseHover(idx, value) {
        isCardHover[idx] = value
        const newArray = [...isCardHover]
        setIsCardHover(newArray)
    }

    return (
        <section className="home-page">
            <div className={`header-container ${isScroll ? 'scrolled' : ''}`}>
                <header className="header">
                    <div className="logo">
                        <img src={imgUrl} alt="" />
                        <span className="span">
                            workit
                        </span>
                    </div>
                    <div className="get-started">
                        <button className="start-btn" onClick={() => navigate('/board')}>
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
                    <h2 className="sub-title">What would you like to manage with workit Work OS?</h2>
                </div>
                <div className="call-to-action">
                    <div className="cards-container">
                        {cardsTitles.map((card, idx) =>
                            <div
                                key={card}
                                className="card"
                                onMouseEnter={() => handleMouseHover(idx, true)}
                                onMouseLeave={() => handleMouseHover(idx, false)}
                                onClick={() => handleCardClick(idx, isCardChecked[idx])}
                                style={{ borderColor: (isCardHover[idx] || isCardChecked[idx]) ? cardsColors[idx].color : '' }}>
                                <div
                                    className="checkbox"
                                    style={{
                                        borderColor: (isCardHover[idx] || isCardChecked[idx]) ? cardsColors[idx].color : '',
                                        backgroundColor: isCardChecked[idx] ? cardsColors[idx].color : ''
                                    }}>
                                    {isCardChecked[idx] && <Icon className="check-icon" icon={Check} iconSize="20" />}
                                </div>
                                <img className="cluster-img" src={cardsIcon[idx]} />
                                <p>{cardsTitles[idx]}</p>
                            </div>
                        )}
                    </div>
                    <div
                        className="bottom-container"
                        style={{ transform: `scale(${scale})` }} >
                        <div className="btn-container" >
                            <button
                                className="start-btn"
                                onClick={() => navigate('/board')}
                                style={{ background: isHeroBtnHover ? utilService.getHeroBtnBg(hoverCardsColorsBtn, true) : utilService.getHeroBtnBg(cardsColorsBtn) }}
                                onMouseEnter={() => setIsHeroBtnHover(true)}
                                onMouseLeave={() => setIsHeroBtnHover(false)}>
                                <span className="span">Get Started</span>
                                <Icon className="icon" icon={MoveArrowRight} iconSize="18" />
                            </button>
                        </div>
                        <p className="small-words">No credit card needed   <span className="icon">✦</span>    Unlimited time on Free plan</p>
                    </div>
                </div>
            </div>
            <div className="big-img-section">
                <img className="big-img" src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/NaamaGros/HP_tests/HP_asset_white_bg.png" alt="" />
            </div>
            <div className="companies-section">
                <div className="title-container">
                    <h2>Trusted by 180,000+ customers worldwide</h2>
                </div>
                <div className="logos-container">
                    {companiesLogos.map((logo, idx) =>
                        <div key={logo} className="logo">
                            <div className="flex align-center">
                                <img className="logo-img" src={companiesLogos[idx]} alt="" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="side-by-side-text-section">
                <div className="content">
                    <div className="big-title">
                        <b>The Work OS that lets you <br /> shape workflows, your way</b>
                    </div>
                    <div className="right-container">
                        <p>Boost your team's alignment, efficiency, and productivity by customizing any workflow to fit your needs.</p>
                        <div className="btn-container">
                            <button className="btn" onClick={() => navigate('/board')}>
                                <span className="span">Get Started</span>
                                <Icon className="icon" icon={MoveArrowRight} iconSize="14" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="review-cards-section">
                <div className="title-container">
                    <div className="stars-container">
                        <img className="stars-img" src="https://dapulse-res.cloudinary.com/image/upload/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/review-cards/stars.png" alt="" />
                    </div>
                    <h2>
                        <b>An award-winning platform. Loved by customers.</b>
                    </h2>
                    <p>Based on 10,000+ customer reviews.</p>
                </div>
                <div className="review-cards">
                    <div className="review-card">
                        <div className="img-container">
                            <img className="img" src="https://dapulse-res.cloudinary.com/image/upload/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/review-cards/trust.png" alt="" />
                        </div>
                        <div className="first-text">
                            <p>Voted best feature set, relationship and value</p>
                        </div>
                        <div className="second-text">
                            <p>“This is the best no-code platform I've ever seen.”</p>
                        </div>
                    </div>
                    <div className="review-card">
                        <div className="img-container">
                            <img className="img" src="https://dapulse-res.cloudinary.com/image/upload/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/review-cards/capterra.png" alt="" />
                        </div>
                        <div className="first-text">
                            <p>Shortlisted in over 8 software categories</p>
                        </div>
                        <div className="second-text">
                            <p>“The perfect organizer and team builder.”</p>
                        </div>
                    </div>
                    <div className="review-card">
                        <div className="img-container">
                            <img className="img" src="https://dapulse-res.cloudinary.com/image/upload/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/review-cards/g2.png" alt="" />
                        </div>
                        <div className="first-text">
                            <p>Market leader across 18 categories</p>
                        </div>
                        <div className="second-text">
                            <p>"Flexible product with near endless possibilities."</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="full-width-section">
                <div className="container">
                    <div className="content">
                        <h2>
                            <br />
                            <br />
                            <span>Deliver your best work </span><b>with workit.com</b>
                        </h2>
                        <div className="small-words">
                            <span>No credit card needed   <span className="icon">✦</span>    Unlimited time on Free plan</span>
                        </div>
                        <div className="btn-container" >
                            <button
                                className="btn"
                                onClick={() => navigate('/board')}>
                                <span className="span">Get Started</span>
                                <Icon className="icon" icon={MoveArrowRight} iconSize="18" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    )
}