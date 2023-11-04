import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { BoardHeader } from "../cmps/BoardHeader";
import { useEffect, useState } from "react";
import { getById, loadBoard } from "../store/actions/board.action";
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service";
import { DeletedBoard } from "../cmps/DeletedBoard";
import { DragDropContext } from "react-beautiful-dnd";

export function BoardDetails() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [onSaveBoard, onRemoveBoard, onRemoveGroup, onRemoveTask, onDuplicateBoard, onDuplicateGroup, onDuplicateTask] = useOutletContext()
    const currBoard = useSelector(state => state.boardModule.board)
    const { boardId } = useParams()
    const navigate = useNavigate()
    const [filterBy, setFilterBy] = useState({ txt: '', person: null })
    const [sortBy, setSortBy] = useState(false)

    useEffect(() => {
        loadBoard(boardId, filterBy, sortBy)
    }, [currBoard, filterBy, sortBy])

    async function onAddTaskFromHeader(board) {
        const taskToAdd = boardService.getEmptyTask()
        try {
            const updatedBoard = await boardService.addTaskFromHeader(board, taskToAdd)
            setBoard(updatedBoard)
        } catch (err) {
            console.log('ShowErrorMsg')
        }
    }

    if (currBoard === undefined) return <DeletedBoard />

    if (currBoard === null) return (
        <section className="waiting-load">
            <div className="loader-container">
                <img src="https://cdn.monday.com/images/loader/loader.gif" alt="" />
            </div>
        </section>
    )

    async function onDragEnd(result) {
        const { destination, source, draggableId, type } = result
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        if (type === 'groups') {
            console.log('currBoard', currBoard);
            const newGroups = [...currBoard.groups]
            const [removed] = newGroups.splice(source.index, 1)
            newGroups.splice(destination.index, 0, removed)
            console.log('currBoard', currBoard._id);
            // const newBoard = { ...currBoard, groups: newGroups }
            await onSaveBoard({ board: currBoard, boardId: currBoard._id, key: 'groups', value: newGroups })
            return
        }

        const start = currBoard.groups.find(group => group.id === source.droppableId)
        const finish = currBoard.groups.find(group => group.id === destination.droppableId)

        if (start === finish) {
            const newTasks = [...start.tasks]
            const [removed] = newTasks.splice(source.index, 1)
            newTasks.splice(destination.index, 0, removed)
            const newGroups = currBoard.groups.map(group => {
                if (group.id === start.id) return { ...group, tasks: newTasks }
                return group
            })
            // const newBoard = { ...currBoard, groups: newGroups }
            await onSaveBoard({ board: currBoard, boardId: currBoard._id, key: 'groups', value: newGroups })
            return
        }
        const startTasks = [...start.tasks]
        startTasks.splice(source.index, 1)
        const newStart = { ...start, tasks: startTasks }
        const task = start.tasks.find(task => task.id === draggableId)
        const finishTasks = [...finish.tasks]
        finishTasks.splice(destination.index, 0, task)
        const newFinish = { ...finish, tasks: finishTasks }
        const newGroups = currBoard.groups.map(group => {
            if (group.id === start.id) return newStart
            if (group.id === finish.id) return newFinish
            return group
        })
        // const newBoard = { ...currBoard, groups: newGroups }
        await onSaveBoard({ board: currBoard, boardId: currBoard._id, key: 'groups', value: newGroups })
    }

    return (
        <section className="board-details main-layout">
            <BoardHeader
                onAddTaskFromHeader={onAddTaskFromHeader}
                onDuplicateBoard={onDuplicateBoard}
                board={currBoard}
                onRemoveBoard={onRemoveBoard}
                onSaveBoard={onSaveBoard}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <DragDropContext onDragEnd={onDragEnd} className="main-layout full">
                <Outlet context={[currBoard, onSaveBoard, onRemoveGroup, onRemoveTask, onDuplicateGroup, onDuplicateTask]} />
            </DragDropContext>
        </section>
    )
}