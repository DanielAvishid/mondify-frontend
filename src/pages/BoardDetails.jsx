import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { BoardHeader } from "../cmps/BoardHeader";
import { useEffect, useState } from "react";
import { getById } from "../store/actions/board.action";
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service";
import { DeletedBoard } from "../cmps/DeletedBoard";

export function BoardDetails() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [onSaveBoard, onRemoveBoard, onRemoveGroup, onRemoveTask, onDuplicateBoard, onDuplicateGroup, onDuplicateTask] = useOutletContext()
    const [board, setBoard] = useState(null)
    const { boardId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBoard()
    }, [boardId, boards])

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

    async function onAddTaskFromHeader(board) {
        const taskToAdd = boardService.getEmptyTask()
        await boardService.addTaskFromHeader(board, taskToAdd)
    }

    if (board === undefined) return <DeletedBoard />
    if (board === null) return <span></span>

    return (
        <section className="board-details main-layout">
            <BoardHeader onAddTaskFromHeader={onAddTaskFromHeader} onDuplicateBoard={onDuplicateBoard} board={board} onRemoveBoard={onRemoveBoard} onSaveBoard={onSaveBoard} />
            <Outlet context={[board, onSaveBoard, onRemoveGroup, onRemoveTask, onDuplicateGroup, onDuplicateTask]} />
        </section>
    )
}