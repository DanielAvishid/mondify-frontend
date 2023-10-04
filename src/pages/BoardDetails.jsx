import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { BoardHeader } from "../cmps/BoardHeader";
import { useEffect, useState } from "react";
import { saveBoard, getById } from "../store/actions/board.action";

export function BoardDetails() {

    const [onDuplicate, onRemove] = useOutletContext()
    const [board, setBoard] = useState(null)
    const { boardId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBoard()
    }, [boardId])

    async function loadBoard() {
        try {
            const board = await getById({ boardId })
            setBoard(board)
        } catch (err) {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
            navigate('/board')
        }
    }

    async function onSaveBoard({ board, boardId, groupId, taskId, key, value }) {
        try {
            const boardToSave = await saveBoard({ board, boardId, groupId, taskId, key, value })
            setBoard(boardToSave)
            console.log('ShowSuccsesMsg')
        } catch (err) {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
        }
    }

    if (!board) return <span></span>
    return (
        <section className="board-details">
            <BoardHeader onDuplicate={onDuplicate} board={board} onRemove={onRemove} onSaveBoard={onSaveBoard} />
            <h1>BoardDetails</h1>
            <Outlet context={[board, onSaveBoard, onDuplicate, onRemove]} />
        </section>
    )
}