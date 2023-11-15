import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { getById } from "../store/actions/board.action"
import { Icon } from "monday-ui-react-core"
import { Drag } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"
import { TaskDetailsHeader } from "../cmps/TaskDetailsHeader"
import { TaskDetailsUpdates } from "../cmps/TaskDetailsUpdates"
import { TaskDetailsActivity } from "../cmps/TaskDetailsActivity"
import { userService } from "../services/user.service"
import { TaskDetailsMobile } from "./TaskDetailsMobile"

export function TaskDetails({ newOnSaveBoard, onRemoveTask, setIsResizing, width }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const board = useSelector(storeState => storeState.boardModule.board)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const navigate = useNavigate()
    const { boardId, taskId } = useParams()
    const [task, setTask] = useState(null)
    const [filteredActivities, setFilteredActivities] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentTab, setCurrentTab] = useState('Updates')
    const [isUpdateEditor, setIsUpdateEditor] = useState(false)
    let timeoutId

    useEffect(() => {
        loadTask()
    }, [boards, taskId, boardId, board])



    async function loadTask() {
        try {
            const task = await getById({ boardId, taskId })
            setTask(task)
            setFilteredActivities(task.activities)
        } catch (err) {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
            navigate('/board')
        }
    }

    function handleSearch(searchValue) {
        console.log('searchValue', searchValue);

        const filtered = activities.filter((activity) =>
            activity.title.toLowerCase().includes(searchValue.toLowerCase())
        )

        console.log('filtered', filtered);

        setSearchTerm(searchValue)
        setFilteredActivities(filtered)
    }

    function onTaskTitleChange(ev) {
        if (!ev.target.value) return
        newOnSaveBoard({ type: 'task', board, taskId, key: 'title', value: ev.target.value })
        // onSaveBoard({ key: 'title', value: ev.target.value, boardId, taskId })
    }

    function onUpdateClick(updateValue) {
        const value = task.updates || []
        const update = {
            id: utilService.makeId(),
            text: updateValue,
            at: Date.now(),
            by: user ? user : {
                "_id": "UjCos",
                "fullname": "Guest",
                "imgUrl": "https://style.monday.com/static/media/person2.24c7233e.png"
            }
        }
        value.unshift(update)
        newOnSaveBoard({ type: 'task', board, taskId, key: 'updates', value })
        setIsUpdateEditor(false)
    }

    function onRemoveUpdate(updateId) {
        const value = task.updates.filter(update => update.id !== updateId)
        newOnSaveBoard({ type: 'task', board, taskId, key: 'updates', value })
        // onSaveBoard({ key: 'updates', value, boardId, taskId })
    }

    function handleMouseDown(ev) {
        ev.preventDefault()
        setIsResizing(true)
    }

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            ev.target.blur()
        }
    }


    if (!task) return <span></span>
    if (window.innerWidth < 500) return (<TaskDetailsMobile newOnSaveBoard={newOnSaveBoard} task={task} board={board} handleKeyPress={handleKeyPress} />)


    return (
        <section
            className={`task-details`}
            style={{ width: width ? `calc(100vw - ${width}px)` : '570px' }}>
            <TaskDetailsHeader
                boardId={boardId}
                task={task}
                onRemoveTask={onRemoveTask}
                setCurrentTab={setCurrentTab}
                onTaskTitleChange={onTaskTitleChange}
                handleKeyPress={handleKeyPress} />

            {currentTab === 'Updates' && <TaskDetailsUpdates
                onRemoveUpdate={onRemoveUpdate}
                task={task}
                onUpdateClick={onUpdateClick}
                isUpdateEditor={isUpdateEditor}
                setIsUpdateEditor={setIsUpdateEditor} />}

            {currentTab === 'Activity Log' && <TaskDetailsActivity filteredActivities={filteredActivities} />}

            <button
                className="drag-btn"
                onMouseDown={(ev) => handleMouseDown(ev)}>
                <Icon className="close-icon" icon={Drag} />
            </button>
        </section >
    )
}

{/* <div className="header">
    <div className="title-container">
        <div className="close-btn-container">
            <Button className="close-btn" kind={Button.kinds.TERTIARY} onClick={() => navigate(`/board/${boardId}`)}>
                <Icon className="close-icon" icon={Close} />
            </Button>
        </div>
        <div className="task-edit-container">
            <EditableHeading
                className="task-title-input"
                type="h2"
                value={task.title}
                onBlur={(ev) => onTitleInputBlur(ev)} />
            <div className="subscribe-container">
                <button className="subscribe-btn">
                    <AvatarGroup
                        className="avatar-group"
                        size="small">
                        {task.members && task.members.map(member =>
                            <Avatar
                                key={member}
                                ariaLabel="Yossi Saadi"
                                src="https://style.monday.com/static/media/person3.3661bfe5.png"
                                type="img"
                            />
                        )}
                    </AvatarGroup>
                </button>
                <MenuButton
                    className="subscriber-menu">
                    <Menu id="menu" size="large" className="menu-modal">
                        <MenuItem
                            icon={Delete}
                            title="Delete"
                            onClick={() => onRemoveTask({ boardId, taskId })} />
                    </Menu>
                </MenuButton>
            </div>
        </div>
    </div>
    <div className="tabs-container">
        <TabList className="tab-list">
            <Tab key='main' tabInnerClassName='updates-tab' icon={Home}>Updates</Tab>
            <Tab key='files' tabInnerClassName='tab'>Files</Tab>
            <Tab key='activity' tabInnerClassName='tab activity-tab'>Activity Log</Tab>
        </TabList>
    </div>
</div> */}













{/* return (
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
value={title}
tooltip='Click to Edit'
tooltipPosition="bottom"
customColor="#323338"
onBlur={(ev) => saveBoard({ key: 'title', value: ev.target.value, boardId, taskId })}
onKeyDown={handleKeyPress}
/>
</article>
<article className="flex align-center justify-between">
<AvatarGroup size="small" type="img" max={3}>
{members.map(member =>
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
</section>} */}

{/* {(updates && updates.length > 0) && <section className="updates-container">
{updates.map(update => <article className="update-txt" key={update.id}>
<article className="flex align-center justify-between">
<div className="flex align-center">
    <Avatar src={update.by.imgUrl} type="img" />
    <h3>{update.by.fullname}</h3>
</div>
<div className="task-edit-container">
    <EditableHeading
        value={task.title}
        className="task-title-input"
        type="h2"
        inputType={'textarea'}
        onBlur={(ev) => handleTaskTitleChange(ev)}
    />
    <div className="subscribe-container">
        <button className="subscribe-btn">
            <AvatarGroup size="small" className="avatar-group">
                <Avatar
                    className="avatar"
                    ariaLabel="Hadas Fahri"
                    src="https://style.monday.com/static/media/person1.de30c8ee.png"
                    type="img"
                /> */}
{/* <Avatar
            ariaLabel="Sergey Roytman"
            src="https://style.monday.com/static/media/person2.24c7233e.png"
            type="img"
        /> */}
{/* </AvatarGroup>
        </button>
        <MenuButton className="subscriber-menu">
            <Menu id="menu" size="large">
                <MenuItem title="Manage subscribers" />
                <MenuItem title="Delete" onClick={() => onRemoveTask({ boardId, taskId })} />
            </Menu>
        </MenuButton>
    </div>
</div>
</div>
<div className="tabs-container">
<TabList className="tab-list">
    <Tab key='main' tabInnerClassName='updates-tab' icon={Home}>Updates</Tab>
    <Tab key='kanban' tabInnerClassName='tab'>Files</Tab>
    <Tab key='kanban' tabInnerClassName='tab activity-tab'>Activity Log</Tab>
</TabList>
</div> */}

{/* <div className="close-container">
<Button className="close-btn" kind={Button.kinds.TERTIARY}>
    <Icon className="close-icon" icon={Close} />
</Button>
</div> */}
{/* <div className="task-title-container"> */ }
{/* <EditableHeading
    className="task-title-input"
    type="h2"
    value="This heading is editable"
    inputType={'textarea'}
/> */}
{/* <div className="subscribe-container"> */ }
{/* <button className="subscribe-btn">
        <AvatarGroup size="small" className="avatar-group">
        <Avatar
                className="avatar"
                ariaLabel="Hadas Fahri"
                src="https://style.monday.com/static/media/person1.de30c8ee.png"
                type="img"
            />
        <Avatar
            ariaLabel="Sergey Roytman"
            src="https://style.monday.com/static/media/person2.24c7233e.png"
            type="img"
        />
        </AvatarGroup>
    </button> */}
{/* <MenuButton className="subscriber-menu">
        <Menu id="menu" size="large">
            <MenuItem title="Manage subscribers" />
            <MenuItem title="Delete" />
        </Menu>
    </MenuButton> */}
// return (
//     <section className='task-details flex column'>
//         <article>
//             <Button
//                 className="close-btn"
//                 kind="tertiary" leftIcon={Close}
//                 size="sm"
//                 onClick={() => navigate(`/board/${boardId}`)}>

//             </Button>
//         </article>

//         <article className="flex align-center justify-between">
//             <article>
//                 <EditableHeading
//                     type={EditableHeading.types.h4}
//                     value={title}
//                     tooltip='Click to Edit'
//                     tooltipPosition="bottom"
//                     customColor="#323338"
//                     onBlur={(ev) => saveBoard({ key: 'title', value: ev.target.value, boardId, taskId })}
//                     onKeyDown={handleKeyPress}
//                 />
//             </article>
//             <article className="flex align-center justify-between">
//                 <AvatarGroup size="small" type="img" max={3}>
//                     {members.map(member =>
//                         <Avatar
//                             key={member}
//                             ariaLabel={member}
//                             src={userImgUrl} />)}
//                 </AvatarGroup>

//                 <MenuButton>
//                     <Menu id="menu" size="large">
//                         <MenuItem icon={Delete} title="Delete" onClick={onRemoveTask} />
//                     </Menu>
//                 </MenuButton>
//             </article>
//         </article>

//         <TabList className="update-list">
//             <Tab tabInnerClassName='tab' icon={Home}>Updates</Tab>
//             <Tab>Files</Tab>
//             <Tab>Activity Log</Tab>
//         </TabList>

//         {!wroteUpdate && <Button
//             className="write-update-btn"
//             kind="Tertiary"
//             onClick={onWrite}>
//             Write an Update...
//         </Button>}

//         {wroteUpdate && <section className="add-update">
//             <article className="text-sec">
//                 <article className="text-tools">
//                 </article>
//                 <textarea onChange={handleChange} value={newUpdateText}></textarea>
//             </article>
//             <article className="flex align-center  justify-between">
//                 <Button
//                     className="add-files-btn"
//                     kind="Tertiary"
//                     leftIcon={Attach}>
//                     Add files
//                 </Button>
//                 <Button
//                     className="update-btn"
//                     onClick={onUpdate}>
//                     Update
//                 </Button>
//             </article>
//         </section>}

//         {(updates && updates.length > 0) && <section className="updates-container">
//             {updates.map(update => <article className="update-txt" key={update.id}>
//                 <article className="flex align-center justify-between">
//                     <div className="flex align-center">
//                         <Avatar src={update.by.imgUrl} type="img" />
//                         <h3>{update.by.fullname}</h3>
//                     </div>
//                     <div className="flex align-center">
//                         <Icon icon={Time} />
//                         <Link ariaLabel={"member"} text={utilService.getTimePassed(update.at)} />
//                         <MenuButton >
//                             <Menu id="menu" size="large">
//                                 <MenuItem icon={Delete} title="Delete update" onClick={() => onRemoveUpdate(update.id)} />
//                             </Menu>
//                         </MenuButton>
//                     </div>
//                 </article>
//                 <textarea disabled defaultValue={update.text}></textarea>
//             </article>)}
//         </section>}

//         {(!updates || !updates.length) && <article className="no-updates-text">
//             <img src={updateImgUrl} />
//             <h1>No updates yet for this item</h1>
//             <p>Be the first one to update about progress, mention someone</p>
//             <p>or upload files to share with your team members</p>
//         </article>}

//     </section>
// )
