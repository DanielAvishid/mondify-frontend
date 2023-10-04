import { useNavigate } from "react-router-dom";
// import Button from "monday-ui-react-core/dist/Button";
import { Button } from "monday-ui-react-core";

export function AppSidebar({ boards }) {
    const navigate = useNavigate()

    if (!boards.length) return <div>loading..</div>
    console.log(boards[0]);
    return (
        <section className="app-sidebar">
            <section>
                <div>
                    <i className="fa-solid fa-house"></i>
                    <span>Home</span>
                </div>
                <div>
                    <i className="fa-regular fa-calendar"></i>
                    <span>My work</span>
                </div>
            </section>
            <section>
                <p>Main workspace</p>
                {boards.map(board =>
                    <button key={board._id} onClick={() => navigate(`/board/${board._id}`)} >
                        <i className="fa-solid fa-tag"></i>
                        <span>{board.title}</span>
                    </button>
                )}

                <Button>carmel</Button>
            </section>

        </section >
    )
}