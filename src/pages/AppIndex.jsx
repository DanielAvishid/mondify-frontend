import { Outlet } from "react-router-dom";
import { AppHeader } from "../cmps/AppHeader";
import { AppSidebar } from "../cmps/AppSidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { duplicate, loadBoards, remove, saveBoard } from "../store/actions/board.action";

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
            await saveBoard({ board, boardId, groupId, taskId })
            console.log('ShowSuccessesMsg')
        } catch (err) {
            console.log('Had issues in save board', err)
            console.log('ShowErrorMsg')
        }
    }

    async function onRemove({ board, boardId, groupId, taskId }) {
        try {
            await remove({ board, boardId, groupId, taskId })
            console.log('ShowSuccessesMsg')
        } catch (err) {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
        }
    }

    async function onDuplicate({ boardId, groupId, taskId }) {
        console.log(boardId, groupId, taskId);
        try {
            await duplicate({ boardId, groupId, taskId })
            console.log('ShowSuccessesMsg')
        } catch (err) {
            console.log('ShowErrorMsg')
        }
    }

    console.log(boards)

    return (
        <section className="app-index">
            <AppHeader />
            <section className="main-container">
                <AppSidebar boards={boards} onDuplicate={onDuplicate} onRemove={onRemove} onSaveBoard={onSaveBoard} />
                <Outlet context={[onDuplicate, onRemove]} />
            </section>
        </section>
    )
}