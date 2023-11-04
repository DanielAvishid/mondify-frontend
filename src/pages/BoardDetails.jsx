import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { BoardHeader } from "../cmps/BoardHeader";
import { useEffect, useState } from "react";
import { getById } from "../store/actions/board.action";
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service";
import { DeletedBoard } from "../cmps/DeletedBoard";
import { DragDropContext } from "react-beautiful-dnd";

export function BoardDetails() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [onSaveBoard, onRemoveBoard, onRemoveGroup, onRemoveTask, onDuplicateBoard, onDuplicateGroup, onDuplicateTask] = useOutletContext()
    const { boardId } = useParams()
    const navigate = useNavigate()
    const [board, setBoard] = useState(null)
    const [filterBy, setFilterBy] = useState({ txt: '', person: null })
    const [sortBy, setSortBy] = useState(false)

    useEffect(() => {
        loadBoard(boardId, filterBy, sortBy)
    }, [boardId, filterBy, sortBy, boards])

    async function loadBoard() {
        try {
            const board = await getById({ boardId, filterBy, sortBy })
            setBoard(board)
        } catch (err) {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
            navigate('/board')
        }
    }

    async function onAddTaskFromHeader(board) {
        const taskToAdd = boardService.getEmptyTask()
        try {
            const updatedBoard = await boardService.addTaskFromHeader(board, taskToAdd)
            setBoard(updatedBoard)
        } catch (err) {
            console.log('ShowErrorMsg')
        }
    }

    async function onDragEnd(result) {
        const { destination, source, draggableId, type } = result
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        if (type === 'groups') {
            const newGroups = [...board.groups]
            const [removed] = newGroups.splice(source.index, 1)
            newGroups.splice(destination.index, 0, removed)
            // const newBoard = { ...board, groups: newGroups }
            await onSaveBoard({ board: board, boardId: board._id, key: 'groups', value: newGroups })
            return
        }

        const start = board.groups.find(group => group.id === source.droppableId)
        const finish = board.groups.find(group => group.id === destination.droppableId)

        if (start === finish) {
            const newTasks = [...start.tasks]
            const [removed] = newTasks.splice(source.index, 1)
            newTasks.splice(destination.index, 0, removed)
            const newGroups = board.groups.map(group => {
                if (group.id === start.id) return { ...group, tasks: newTasks }
                return group
            })
            // const newBoard = { ...board, groups: newGroups }
            await onSaveBoard({ board: board, boardId: board._id, key: 'groups', value: newGroups })
            return
        }
        const startTasks = [...start.tasks]
        startTasks.splice(source.index, 1)
        const newStart = { ...start, tasks: startTasks }
        const task = start.tasks.find(task => task.id === draggableId)
        const finishTasks = [...finish.tasks]
        finishTasks.splice(destination.index, 0, task)
        const newFinish = { ...finish, tasks: finishTasks }
        const newGroups = board.groups.map(group => {
            if (group.id === start.id) return newStart
            if (group.id === finish.id) return newFinish
            return group
        })
        // const newBoard = { ...board, groups: newGroups }
        await onSaveBoard({ board: board, boardId: board._id, key: 'groups', value: newGroups })
    }

    if (board === undefined) return <DeletedBoard />

    if (board === null) return (
        <section className="waiting-load">
            <div className="loader-container">
                <img src="https://cdn.monday.com/images/loader/loader.gif" alt="" />
            </div>
        </section>
    )

    return (
        <section className="board-details main-layout">


            <BoardHeader
                onAddTaskFromHeader={onAddTaskFromHeader}
                onDuplicateBoard={onDuplicateBoard}
                board={board}
                onRemoveBoard={onRemoveBoard}
                onSaveBoard={onSaveBoard}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                sortBy={sortBy}
            />
            <DragDropContext onDragEnd={onDragEnd} className="main-layout full">
                <Outlet context={[board, onSaveBoard, onRemoveGroup, onRemoveTask, onDuplicateGroup, onDuplicateTask]} />
            </DragDropContext>
        </section>
    )
}