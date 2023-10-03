import { Outlet } from "react-router-dom";
import { AppHeader } from "../cmps/AppHeader";
import { AppSidebar } from "../cmps/AppSidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loadBoards } from "../store/actions/board.action";

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

    console.log(boards)

    return (
        <section className="app-index">
            <AppHeader />
            <AppSidebar boards={boards} />
            <Outlet />
        </section>
    )
}