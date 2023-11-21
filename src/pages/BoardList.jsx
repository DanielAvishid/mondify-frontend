import { Icon, IconButton } from "monday-ui-react-core"
import { useNavigate, useOutletContext } from "react-router"
import { Favorite, Board, DropdownChevronRight, DropdownChevronDown, Search, Add } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { GoHomeFill, GoStarFill } from "react-icons/go";
import { useSelector } from "react-redux"
import { userService } from "../services/user.service"
import { useEffect, useRef, useState } from "react"
import { boardService } from "../services/board.service";

export function BoardList() {

    const [onSaveBoard, , , , , , , boards] = useOutletContext()
    const [isCollapse, setIsCollapse] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isAbove600px, setIsAbove600px] = useState(window.innerWidth > 600)
    const inputRef = useRef(null)

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    function handleResize() {
        setIsAbove600px(window.innerWidth > 600)
    }

    function onAddBoard(ev) {
        ev.stopPropagation()
        const board = boardService.getEmptyBoard()
        onSaveBoard({ board })
    }

    return (
        <>
            {!isAbove600px && <section className="board-list-mobile">
                <div className="logo">
                    <img src="https://res.cloudinary.com/dvcgvn34o/image/upload/v1700516255/monday-img_bigkmy.png" alt="" />
                    <span className="logo-name">workit</span>
                </div>
                <div className="search-container">
                    <Icon className="search-icon" icon={Search} onClick={() => inputRef.current.focus()} />
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search boards"
                        ref={inputRef} />
                </div>
                <div className="list">
                    {boards.map(board =>
                        <div
                            className="board-preview"
                            key={board._id}
                            onClick={() => navigate(`/board/${board._id}`)}>
                            <div className="board-content">
                                <img src="https://cdn.monday.com/images/quick_search_recent_board.svg" alt="" />
                                <h3>{board.title}</h3>
                            </div>
                            <Icon
                                className={`favorite-icon ${board.isStarred ? 'isFavorite' : ''}`}
                                icon={board.isStarred ? GoStarFill : Favorite}
                                onClick={(ev) => { ev.stopPropagation(); onSaveBoard({ board, key: 'isStarred', value: !board.isStarred }) }} />
                        </div>
                    )}
                </div>
                <div className="add-btn" onClick={onAddBoard}>
                    <Icon className="add-icon" icon={Add} />
                </div>
            </section>}
            {isAbove600px && <section className="board-list">
                <div className="header">
                    <div className="header-content">
                        <div className="titles-container">
                            <p className="welcome-user">
                                {`Welcome, ${user ? user.fullname : userService.getDefaultUser().fullname}!`}
                            </p>
                            <p className="welcome-info">
                                Quickly access your recent boards and Inbox
                            </p>
                        </div>
                        <div className="welcome-img">
                            <img src="https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="main-container">
                    <div className="boards-container">
                        {boards.map(board =>
                            <div key={board._id} className="board-card flex" onClick={() => navigate(`/board/${board._id}`)}>
                                <div className="img-container flex">
                                    <img src="https://cdn.monday.com/images/quick_search_recent_board.svg" alt="" />
                                </div>
                                <div className="flex justify-between align-center">
                                    <div className="flex align-center">
                                        <Icon className="board-icon" icon={Board} />
                                        <span className="board-title">{board.title}</span>
                                    </div>
                                    <IconButton className="favorite-btn" ariaLabel="Add to favorites" icon={Favorite} />
                                </div>
                            </div>)}
                    </div>
                </div>
            </section>}
        </>
    )
}