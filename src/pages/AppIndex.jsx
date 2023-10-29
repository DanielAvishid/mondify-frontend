import { Outlet } from "react-router-dom";
import { AppHeader } from "../cmps/AppHeader";
import { AppSidebar } from "../cmps/AppSidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { duplicate, loadBoards, remove, saveBoard } from "../store/actions/board.action";
import { SET_BOARDS } from "../store/reducers/board.reducer";
import { store } from "../store/store";
import { showSuccessMsg } from "../services/event-bus.service";

export function AppIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        onLoadBoards()
    }, [])

    async function onLoadBoards() {
        try {
            loadBoards()
        } catch (err) {
            console.log('ShowErrorMsg')
        }
    }

    async function onSaveBoard({ board, boardId, groupId, taskId, key, value }) {
        try {
            await saveBoard({ board, boardId, groupId, taskId, key, value })
            console.log('ShowSuccessesMsg')
        } catch (err) {
            console.log('Had issues in save board', err)
            console.log('ShowErrorMsg')
        }
    }

    async function onRemoveBoard({ board, boardId }) {
        try {
            await remove({ board, boardId })
            showSuccessMsg(`We successfully deleted the board`)
        } catch {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
        }
    }

    async function onRemoveGroup({ boardId, groupId }) {
        try {
            await remove({ boardId, groupId })
            showSuccessMsg(`group was successfully deleted.`)
        } catch {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
        }
    }

    async function onRemoveTask({ boardId, taskId }) {
        try {
            await remove({ boardId, taskId })
            showSuccessMsg(`We successfully deleted 1 item`)
        } catch {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
        }
    }

    async function onDuplicateBoard({ boardId }) {
        try {
            await duplicate({ boardId })
            showSuccessMsg('Board has been duplicated successfully')
        } catch (err) {
            console.log('ShowErrorMsg')
        }
    }

    async function onDuplicateGroup({ boardId, groupId }) {
        try {
            await duplicate({ boardId, groupId })
            showSuccessMsg('Group has been duplicated successfully')
        } catch (err) {
            console.log('ShowErrorMsg')
        }
    }

    async function onDuplicateTask({ boardId, groupId, taskId }) {
        try {
            await duplicate({ boardId, groupId, taskId })
            showSuccessMsg('We successfully duplicated 1 item')
        } catch (err) {
            console.log('ShowErrorMsg')
        }
    }

    function updateBoards(boards) {
        store.dispatch({ type: SET_BOARDS, boards })
    }

    return (
        <section className="app-index">
            <AppHeader />
            <section className="main-container">
                <AppSidebar boards={boards} onDuplicateBoard={onDuplicateBoard} onRemoveBoard={onRemoveBoard} onSaveBoard={onSaveBoard} updateBoards={updateBoards} />
                <Outlet context={[onSaveBoard, onRemoveBoard, onRemoveGroup, onRemoveTask, onDuplicateBoard, onDuplicateGroup, onDuplicateTask, boards]} />
            </section>
        </section>
    )
}





// async function onDuplicate({ boardId, groupId, taskId }) {
//     try {
//         await duplicate({ boardId, groupId, taskId })
//         showSuccessMsg(`Duplicating Board`)
//     } catch (err) {
//         console.log('ShowErrorMsg')
//     }
// }

// async function onRemove({ board, boardId, groupId, taskId }) {
//     try {
//         await remove({ board, boardId, groupId, taskId })
//         showSuccessMsg(`We successfully deleted the board`)
//     } catch (err) {
//         console.log('Had issues in board details', err)
//         console.log('ShowErrorMsg')
//     }
// }