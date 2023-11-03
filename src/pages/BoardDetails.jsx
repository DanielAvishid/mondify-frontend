import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { BoardHeader } from "../cmps/BoardHeader";
import { useEffect, useState } from "react";
import { getById, loadBoard } from "../store/actions/board.action";
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service";
import { DeletedBoard } from "../cmps/DeletedBoard";

export function BoardDetails() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [onSaveBoard, onRemoveBoard, onRemoveGroup, onRemoveTask, onDuplicateBoard, onDuplicateGroup, onDuplicateTask] = useOutletContext()
    const board = useSelector(state => state.boardModule.board)
    const { boardId } = useParams()
    const navigate = useNavigate()
    const [filterBy, setFilterBy] = useState({ txt: '', person: null })
    const [sortBy, setSortBy] = useState(false)

    useEffect(() => {
        loadBoard(boardId, filterBy, sortBy)
    }, [boardId, filterBy, boards])

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
            <Outlet context={[board, onSaveBoard, onRemoveGroup, onRemoveTask, onDuplicateGroup, onDuplicateTask]} />
        </section>
    )
}