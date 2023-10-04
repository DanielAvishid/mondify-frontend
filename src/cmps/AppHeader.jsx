import Button from "monday-ui-react-core/dist/Button";
import imgUrl from '../assets/img/monday-img.png'
import {  IconButton } from "monday-ui-react-core";
import { Switcher, Notifications, Inbox, Invite, Apps, Search, Help } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"

export function AppHeader() {
    return (
        <section className="app-header flex justify-between align-center">
            <section className="flex align-center">
                <IconButton icon={Switcher} kind={IconButton.kinds.TERTIARY} />
                <p className="logo"><span>monday</span> work management</p>
            </section>
            <section className="flex justify-center align-center">
                <IconButton icon={Notifications} kind={IconButton.kinds.TERTIARY} ariaLabel="Notifications" />
                <IconButton icon={Inbox} kind={IconButton.kinds.TERTIARY} ariaLabel="Inbox" />
                <IconButton icon={Invite} kind={IconButton.kinds.TERTIARY} ariaLabel="Invite Members" />
                <IconButton icon={Apps} kind={IconButton.kinds.TERTIARY} ariaLabel="Apps" className="apps-icon"/>
                <IconButton icon={Search} kind={IconButton.kinds.TERTIARY} ariaLabel="Search Everything" />
                <IconButton icon={Help} kind={IconButton.kinds.TERTIARY} ariaLabel="Help" />
                <img src={imgUrl} />
            </section>


        </section>
    )
}