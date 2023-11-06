import { Icon, IconButton } from "monday-ui-react-core"
import { useNavigate, useOutletContext } from "react-router"
import { Favorite, Board, DropdownChevronRight, DropdownChevronDown } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useSelector } from "react-redux"
import { userService } from "../services/user.service"
import { useState } from "react"

export function BoardList() {

    const [, , , , , , , boards] = useOutletContext()
    const [isCollapse, setIsCollapse] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    return (
        <section className="board-list">
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
                {/* <div className="boards-container">
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
                </div> */}
            </div>
        </section>
    )
}