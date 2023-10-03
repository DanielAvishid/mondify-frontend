// import { Button, Icon } from "monday-ui-react-core";
import Button from "monday-ui-react-core/dist/Button";
import imgUrl from '../assets/img/monday-img.png'

export function AppHeader() {
    return (
        <section className="app-header flex justify-between align-center">
            <section  className="flex align-center">
                <div>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
                <p className="logo"><span>monday</span> work management</p>
            </section>
            <section className="flex justify-center align-center">
                <i className="fa-regular fa-bell"></i>
                <i className="fa-solid fa-inbox"></i>
                <i className="fa-solid fa-user-plus"></i>
                <i className="fa-solid fa-puzzle-piece"></i>
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-solid fa-question"></i>
                <img src={imgUrl}  />
            </section>
        </section>
    )
}