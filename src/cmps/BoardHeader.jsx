import { useState } from "react"
import { Link } from "react-router-dom"

export function BoardHeader({ board, onRemoveBoard, onUpdateBoard }) {

    const [isCollapse, setIsCollapse] = useState(false)

    return (
        <section className="board-header">
            <section className="board-header-non-collapse">
                <div className="title-container">
                    <h2>{board.title}</h2>
                    <button>&#8595;</button>
                </div>
                <div>
                    <Link className="btn" to='#'>
                        <button>Show activity</button>
                        {/* <img src={board.members[0].img} alt="" />
                        {board.members[1] && <img src={board.mebmers[1].img} alt="" />} */}
                        {/* put here the extra +counter */}
                    </Link>
                    <button>
                        Invite /
                        {/* Counter */}
                    </button>
                    <button>&#x22EF;</button>
                </div>
            </section>
            <h1>BoardHeader</h1>
        </section>
    )
}