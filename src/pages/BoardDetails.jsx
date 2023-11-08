import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { BoardHeader } from "../cmps/BoardHeader";
import { useEffect, useRef, useState } from "react";
import { getById, loadBoard } from "../store/actions/board.action";
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service";
import { DeletedBoard } from "../cmps/DeletedBoard";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { SET_BOARD, SET_BOARDS } from "../store/reducers/board.reducer";
import { SOCKET_EMIT_SET_BOARD, SOCKET_EVENT_CHANGE_BOARD, socketService } from "../services/socket.service";

export function BoardDetails() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isBoardChange, setIsBoardChange] = useState(false)
    const [onSaveBoard, onRemoveBoard, onRemoveGroup, onRemoveTask, onDuplicateBoard, onDuplicateGroup, onDuplicateTask] = useOutletContext()
    const [isScrolling, setIsScrolling] = useState(false)
    const { boardId } = useParams()
    const [filterBy, setFilterBy] = useState({ txt: '', person: null })
    const [sortBy, setSortBy] = useState(false)
    const [isCollapse, setIsCollapse] = useState({})
    const [isInitialSetupComplete, setIsInitialSetupComplete] = useState(false);
    const dispatch = useDispatch()
    const containerRef = useRef()

    useEffect(() => {
        // if (!board) dispatch({ type: SET_BOARD, board: undefined })
        loadBoard(boardId, filterBy, sortBy)
    }, [boardId, filterBy, sortBy, boards, isBoardChange])

    useEffect(() => {
        if (board && !isInitialSetupComplete) {
            const initialIsCollapse = {};
            board.groups.forEach(group => {
                initialIsCollapse[group.id] = false;
            });
            setIsCollapse(initialIsCollapse);
            setIsInitialSetupComplete(true);
        }
    }, [board, isInitialSetupComplete]);

    useEffect(() => {
        let scrollTimeout

        function handleScroll() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }

            scrollTimeout = setTimeout(() => {
                const container = containerRef.current
                const atTop = container.scrollTop === 0

                setIsScrolling(atTop ? false : true)
            }, 2)
        }

        containerRef.current.addEventListener('scroll', handleScroll)

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll)
            }
        }
    }, [board])


    //emit SET_BOARD parameter boardId
    //on UPDATE_BOARD

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_BOARD, boardId)
        console.log('EMIT_SET_BOARD')
        return () => {
            socketService.off(SOCKET_EMIT_SET_BOARD, boardId)
        }
    }, [boardId])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_CHANGE_BOARD, changeBoard)
        console.log('EVENT_CHANGE_BOARD')
        return () => {
            socketService.off(SOCKET_EVENT_CHANGE_BOARD, changeBoard)
        }
    }, [])

    function changeBoard(updatedBoard) {
        dispatch({ type: SET_BOARD, board: updatedBoard })
        setIsBoardChange(!isBoardChange)
    }

    function updateIsCollapse(value, currentIsCollapse) {
        const updatedIsCollapse = {};
        for (const key in currentIsCollapse) {
            updatedIsCollapse[key] = value;
        }
        setIsCollapse(updatedIsCollapse);
    }

    function onAddGroup(place = null) {
        console.log(place);
        const newGroup = boardService.getEmptyGroup()
        const value = (place === 'top') ? [newGroup, ...board.groups] : [...board.groups, newGroup]
        console.log('value', value);

        setIsCollapse((prevIsCollapse) => ({
            ...prevIsCollapse,
            [newGroup.id]: false
        }));
        onSaveBoard({ boardId: board._id, key: 'groups', value })
    }

    async function onAddTaskFromHeader(board) {
        const taskToAdd = boardService.getEmptyTask()
        try {
            const updatedBoard = await boardService.addTaskFromHeader(board, taskToAdd)
            dispatch({ type: SET_BOARD, board: updatedBoard })
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
            const newBoard = { ...board, groups: newGroups }
            dispatch({ type: SET_BOARD, board: newBoard })
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
            const newBoard = { ...board, groups: newGroups }
            dispatch({ type: SET_BOARD, board: newBoard })
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
        const newBoard = { ...board, groups: newGroups }
        dispatch({ type: SET_BOARD, board: newBoard })
        await onSaveBoard({ board: board, boardId: board._id, key: 'groups', value: newGroups })
    }

    // if (board === undefined) return <DeletedBoard />

    // if (board === null) return (
    //     <section className="waiting-load">
    //         <div className="loader-container">
    //             <img src="https://cdn.monday.com/images/loader/loader.gif" alt="" />
    //         </div>
    //     </section>
    // )

    return (
        <section
            className="board-details main-layout"
            ref={containerRef}>
            {board === undefined && <section className="waiting-load">
                <div className="loader-container">
                    <img src="https://cdn.monday.com/images/loader/loader.gif" alt="" />
                </div>
            </section>}
            {board === null && <DeletedBoard />}
            {board && <BoardHeader
                onAddTaskFromHeader={onAddTaskFromHeader}
                onDuplicateBoard={onDuplicateBoard}
                board={board}
                onRemoveBoard={onRemoveBoard}
                onSaveBoard={onSaveBoard}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onAddGroup={onAddGroup}
                isScrolling={isScrolling}
            />}
            {board && < DragDropContext onDragEnd={onDragEnd} className="main-layout full">
                <Outlet context={[board, onSaveBoard, onRemoveGroup, onRemoveTask, onDuplicateGroup, onDuplicateTask, isCollapse, setIsCollapse, updateIsCollapse, onAddGroup]} />
            </DragDropContext>}
        </section >
    )
}