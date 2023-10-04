import Button from "monday-ui-react-core/dist/Button";
import imgUrl from '../assets/img/monday-img.png'
import {  IconButton } from "monday-ui-react-core";
import { Switcher, Home } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"

export function AppHeader() {
    return (
        <section className="app-header flex justify-between align-center">
            <section className="flex align-center">
                <IconButton icon={Switcher} kind={IconButton.kinds.TERTIARY} ariaLabel="My tertiary IconButton" />
                <p className="logo"><span>monday</span> work management</p>
            </section>
            <section className="flex justify-center align-center">
                <i className="fa-regular fa-bell"></i>
                <i className="fa-solid fa-inbox"></i>
                <i className="fa-solid fa-user-plus"></i>
                <i className="fa-solid fa-puzzle-piece"></i>
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-solid fa-question"></i>
                <img src={imgUrl} />
            </section>


        </section>
    )
}