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
    }, [boardId, filterBy, sortBy])

    // async function loadBoard() {
    //     try {
    //         const board = await getById({ boardId })
    //         setBoard(board)
    //     } catch (err) {
    //         console.log('Had issues in board details', err)
    //         console.log('ShowErrorMsg')
    //         navigate('/board')
    //     }
    // }

    async function onAddTaskFromHeader(board) {
        const taskToAdd = boardService.getEmptyTask()
        try {
            const updatedBoard = await boardService.addTaskFromHeader(board, taskToAdd)
            setBoard(updatedBoard)
        } catch (err) {
            console.log('ShowErrorMsg')
        }
    }

    // function toggleIsSearch() {
    //     if (filterBy.txt) return
    //     setIsSearch((prevIsSearch) => !prevIsSearch)
    // }


    // const groups = board.groups
    // const [filteredGroups, setFilteredGroups] = useState(groups)
    // const [searchTerm, setSearchTerm] = useState('')

    // const handleSearch = (searchValue) => {
    //     console.log('searchValue', searchValue);

    //     const filtered = groups.filter((activity) =>
    //         activity.title.toLowerCase().includes(searchValue.toLowerCase())
    //     )

    //     console.log('filtered', filtered);

    //     setSearchTerm(searchValue)
    //     setFilteredActivities(filtered)
    // }

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

        // if (type === 'kanban-tasks') {
        //     const sourceLabel = source.droppableId.split('-')[2]
        //     const destinationLabel = destination.droppableId.split('-')[2]
        //     const taskId = draggableId.split('-')[2]

        //     const newGroups = [...currBoard.groups].map(group => {
        //         const tasks = [...group.tasks]
        //         tasks.map(task => {
        //             if (task.id === taskId) task.status = destinationLabel
        //             else return task
        //         })
        //         return { ...group, tasks }
        //     })
        //     const newBoard = { ...currBoard, groups: newGroups }
        //     await updateBoardOptimistic('board', currBoard._id, null, null, { key: 'groups', value: newGroups }, newBoard)
        //     return
        // }

        // if (type === 'kanban-groups') {
        //     if (currBoard.kanbanCmpsOrder) {
        //         const newCmpsOrder = [...currBoard.kanbanCmpsOrder]
        //         const [removed] = newCmpsOrder.splice(source.index, 1)
        //         newCmpsOrder.splice(destination.index, 0, removed)
        //         const newBoard = { ...currBoard, kanbanCmpsOrder: newCmpsOrder }
        //         await updateBoardOptimistic('board', currBoard._id, null, null, { key: 'kanbanCmpsOrder', value: newCmpsOrder }, newBoard)
        //     }
        //     else {
        //         const kanbanCmpsOrder = getLabelsInUse()
        //         console.log('kanbanCmpsOrder:', kanbanCmpsOrder)
        //         const newBoard = { ...currBoard, kanbanCmpsOrder }
        //         await updateBoardOptimistic('board', currBoard._id, null, null, { key: 'kanbanCmpsOrder', value: kanbanCmpsOrder }, newBoard)
        //     }
        //     return
        // }

        // if (type === 'columns') {
        //     const newCmpsOrder = [...currBoard.cmpsOrder]
        //     const [removed] = newCmpsOrder.splice(source.index, 1)
        //     newCmpsOrder.splice(destination.index, 0, removed)
        //     const newBoard = { ...currBoard, cmpsOrder: newCmpsOrder }
        //     await updateBoardOptimistic('board', currBoard._id, null, null, { key: 'cmpsOrder', value: newCmpsOrder }, newBoard)
        //     return
        // }

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