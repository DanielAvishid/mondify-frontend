import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { BoardHeader } from "../cmps/BoardHeader";
import { boardService } from "../services/board.service";
import { useEffect, useState } from "react";
import { removeBoardOptimistic, saveBoard } from "../store/actions/board.action";

export function BoardDetails() {

    const [board, setBoard] = useState(null)
    const { boardId } = useParams()
    const navigate = useNavigate()
    const [] = useOutletContext()

    useEffect(() => {
        loadBoard()
    }, [boardId])

    async function loadBoard() {
        try {
            const board = await boardService.getById(boardId)
            console.log(board)
            setBoard(board)
        } catch (err) {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
            navigate('/board')
        }
    }

    async function onRemoveBoard() {
        try {
            removeBoardOptimistic(boardId)
            console.log('ShowSuccsessMsg')
        } catch (err) {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
        }
    }

    async function onUpdateBoard(boardToSave) {
        try {
            saveBoard(boardToSave)
            console.log('ShowSuccsesMsg')
        } catch (err) {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
        }
    }

    if (!board) return <span></span>
    return (
        <section className="board-details">
            <BoardHeader board={board} onRemoveBoard={onRemoveBoard} onUpdateBoard={onUpdateBoard} />
            <h1>BoardDetails</h1>
            <Outlet context={[board]} />
        </section>
    )
}