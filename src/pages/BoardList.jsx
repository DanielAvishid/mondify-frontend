import { Icon, IconButton, Link } from "monday-ui-react-core"
import { useNavigate, useOutletContext } from "react-router"
import { Favorite, Board } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"

export function BoardList() {

    const [, , , , , , , boards] = useOutletContext()
    const navigate = useNavigate()

    return (
        <section className="board-list">
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
        </section>
    )
}