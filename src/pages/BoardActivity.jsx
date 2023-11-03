import { Avatar, AvatarGroup, Button, EditableHeading, Menu, MenuButton, MenuItem, Tab, TabList, Heading, Badge, Link, Icon, IconButton, MenuDivider } from "monday-ui-react-core"
import { Close, Attach, Delete, Home, Time } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import userImgUrl from '../assets/img/user-img.png'
import updateImgUrl from '../assets/img/update-img.png'
import { ActivityHeader } from "../cmps/ActivityHeader"
import { ActivityDetails } from "../cmps/ActivityDetails"
import { useState } from "react"

export function BoardActivity() {

    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()
    const { boardId } = useParams()

    const board = boards.find((board) => board._id === boardId);

    const activities = board.activities
    const [filteredActivities, setFilteredActivities] = useState(activities)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (searchValue) => {
        console.log('searchValue', searchValue);

        const filtered = activities.filter((activity) =>
            activity.title.toLowerCase().includes(searchValue.toLowerCase())
        )

        console.log('filtered', filtered);

        setSearchTerm(searchValue)
        setFilteredActivities(filtered)
    }

    return (
        <section className="board-activity flex column">
            <ActivityHeader board={board} navigate={navigate} />
            <ActivityDetails
                board={board}
                filteredActivities={filteredActivities}
                searchTerm={searchTerm}
                handleSearch={handleSearch} />
            {/* <MenuDivider className='menu-divider' /> */}



            {/* show when empty */}

            {/* <div className="no-updates-text">
                <img src={updateImgUrl} />
                <h1>No updates yet for this item</h1>
                <p>Be the first one to update about progress, mention someone</p>
                <p>or upload files to share with your team members</p>
            </div> */}
        </section>

    )
}