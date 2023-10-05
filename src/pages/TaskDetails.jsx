import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getById, saveBoard } from "../store/actions/board.action"
import { Avatar, AvatarGroup, Button, EditableHeading, Menu, MenuButton, MenuItem, Tab, TabList, Heading, Badge, Link, Icon } from "monday-ui-react-core"
import { Close, Attach, Delete, Home, Time } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { remove } from "../store/actions/board.action"
import userImgUrl from '../assets/img/user-img.png'
import updateImgUrl from '../assets/img/update-img.png'
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"

export function TaskDetails() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()
    const { boardId, taskId } = useParams()
    const [task, setTask] = useState(null)
    const [wroteUpdate, setWroteUpdate] = useState(false)
    const [newUpdateText, setNewUpdateText] = useState('')

    useEffect(() => {
        loadTask()
        setWroteUpdate(false)
    }, [boardId, taskId, boards])

    async function loadTask() {
        try {
            const task = await getById({ boardId, taskId })
            setTask(task)
        } catch (err) {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
            navigate('/board')
        }
    }

    async function onRemoveTask() {
        try {
            await remove({ boardId, taskId })
            navigate(`/board/${boardId}`)
        } catch (err) {
            console.log("error msg", err);
        }
    }

    function onUpdate() {
        const value = task.updates || []
        const update = {
            id: utilService.makeId(),
            text: newUpdateText,
            at: Date.now(),
            by: {
                "_id": "UjCos",
                "fullname": "Carmel Amarilio",
                "imgUrl": "https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-464163411.jpg?crop=1.0xw:1xh;center,top&resize=980:*"
            }
        }
        value.unshift(update)
        try {
            saveBoard({ key: 'updates', value, boardId, taskId })
            setNewUpdateText('')
        } catch (err) {
            console.log('canot add update to task', err);
        }
    }

    function onRemoveUpdate(updates){
        const value = task.updates.filter(update => update.id !== updates)
        try {
            saveBoard({ key: 'updates', value, boardId, taskId })
        } catch (err) {
            console.log('canot add update to task', err);
        }
    }

    function onWrite() {
        setWroteUpdate(true)
    }

    function handleChange({ target }) {
        setNewUpdateText(target.value)
    }

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            saveBoard({ key: 'title', value: ev.target.value, boardId, taskId })
            ev.target.blur()
        }
    }

    if (!task) return <span></span>
    console.log(task);
    const { id, TaskTitle, Members, updates } = task
    console.log(updates);
    return (
        <section className='task-details flex column'>
            <article>
                <Button
                    className="close-btn"
                    kind="tertiary" leftIcon={Close}
                    size="sm"
                    onClick={() => navigate(`/board/${boardId}`)}>

                </Button>
            </article>

            <article className="flex align-center justify-between">
                <article>
                    <EditableHeading
                        type={EditableHeading.types.h4}
                        value={TaskTitle}
                        tooltip='Click to Edit'
                        tooltipPosition="bottom"
                        customColor="#323338"
                        onBlur={(ev) => saveBoard({ key: 'TaskTitle', value: ev.target.value, boardId, taskId })}
                        onKeyDown={handleKeyPress}
                    />
                </article>
                <article className="flex align-center justify-between">
                    <AvatarGroup size="small" type="img" max={3}>
                        {Members.map(member =>
                            <Avatar
                                key={member}
                                ariaLabel={member}
                                src={userImgUrl} />)}
                    </AvatarGroup>

                    <MenuButton>
                        <Menu id="menu" size="large">
                            <MenuItem icon={Delete} title="Delete" onClick={onRemoveTask} />
                        </Menu>
                    </MenuButton>
                </article>
            </article>

            <TabList className="update-list">
                <Tab tabInnerClassName='tab' icon={Home}>Updates</Tab>
                <Tab>Files</Tab>
                <Tab>Activity Log</Tab>
            </TabList>

            {!wroteUpdate && <Button
                className="write-update-btn"
                kind="Tertiary"
                onClick={onWrite}>
                Write an Update...
            </Button>}

            {wroteUpdate && <section className="add-update">
                <article className="text-sec">
                    <article className="text-tools">
                    </article>
                    <textarea onChange={handleChange} value={newUpdateText}></textarea>
                </article>
                <article className="flex align-center  justify-between">
                    <Button
                        className="add-files-btn"
                        kind="Tertiary"
                        leftIcon={Attach}>
                        Add files
                    </Button>
                    <Button
                        className="update-btn"
                        onClick={onUpdate}>
                        Update
                    </Button>
                </article>
            </section>}

            {(updates && updates.length>0) && <section className="updates-container">
                {updates.map(update => <article className="update-txt" key={update.id}>
                    <article className="flex align-center justify-between">
                        <div className="flex align-center">
                            <Avatar src={update.by.imgUrl} type="img" />
                            <h3>{update.by.fullname}</h3>
                        </div>
                        <div className="flex align-center">
                            <Icon icon={Time} />
                            <Link ariaLabel={"member"} text={utilService.getTimePassed(update.at)} />
                            <MenuButton >
                                <Menu id="menu" size="large">
                                    <MenuItem icon={Delete} title="Delete update" onClick={()=>onRemoveUpdate(update.id)} />
                                </Menu>
                            </MenuButton>
                        </div>
                    </article>
                    <textarea disabled defaultValue={update.text}></textarea>
                </article>)}
            </section>}

            {(!updates || !updates.length) && <article className="no-updates-text">
                <img src={updateImgUrl} />
                <h1>No updates yet for this item</h1>
                <p>Be the first one to update about progress, mention someone</p>
                <p>or upload files to share with your team members</p>
            </article>}

        </section>
    )
}