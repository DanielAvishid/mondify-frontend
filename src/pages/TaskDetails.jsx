import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getById, saveBoard } from "../store/actions/board.action"
import { Avatar, AvatarGroup, Button, EditableHeading, Menu, MenuButton, MenuItem, Tab, TabList, Icon } from "monday-ui-react-core"
import { Close, Drag, Home, Time, Delete } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"

export function TaskDetails({ onSaveBoard, onRemoveTask, setIsResizing, width, containerWidth }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()
    const { boardId, taskId } = useParams()
    const [task, setTask] = useState(null)
    const [isUpdateMode, setIsUpdateMode] = useState(false)
    const textareaRef = useRef(null)

    useEffect(() => {
        loadTask()
    }, [boards, taskId, boardId])

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

    function onTitleInputBlur(ev) {
        if (!ev.target.value) return
        onSaveBoard({ key: 'title', value: ev.target.value, boardId, taskId })
    }


    function handleTextareaInput() {
        const textarea = textareaRef.current
        textarea.style.height = 'auto'
        textarea.style.height = textarea.scrollHeight + 'px'
    }

    function onUpdateClick() {
        console.log(textareaRef.current.value)
        const value = task.updates || []
        const update = {
            id: utilService.makeId(),
            text: textareaRef.current.value,
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
            setIsUpdateMode(false)
        } catch (err) {
            console.log('canot add update to task', err);
        }
    }

    function onRemoveUpdate(updateId) {
        const value = task.updates.filter(update => update.id !== updateId)
        try {
            saveBoard({ key: 'updates', value, boardId, taskId })
        } catch (err) {
            console.log('canot add update to task', err);
        }
    }

    function handleMouseDown(ev) {
        ev.preventDefault()
        setIsResizing(true)
    }

    if (!task) return <span></span>

    return (
        <section
            className='task-details'
            style={{ width: width ? `calc(100vw - ${width}px)` : '570px' }}>
            <section className="task-details-content">
                <div className="header">
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
                </div>
                {/* <div className="main-content">
                    <div className="updates-container">
                        <div className="updates">
                            {!isUpdateMode && <div className="update-btn-container">
                                <button className="update-btn" onClick={() => setIsUpdateMode(true)}>
                                    Write an update...
                                </button>
                            </div>}
                            {isUpdateMode && <div className="post-editor" ref={editorContainer}>
                                <div className="text-tools">
                                </div>
                                <div className="text-area">
                                    <textarea
                                        ref={textareaRef}
                                        onInput={handleTextareaInput}
                                        rows={1}
                                        style={{ overflowY: 'auto' }}></textarea>
                                </div>
                            </div>}
                            {isUpdateMode && <div className="btn-container">
                                <Button size="small" onClick={onUpdateClick}>
                                    Update
                                </Button>
                            </div>}
                        </div>
                        <div className="updates-list">
                            {task.updates && task.updates.map(update =>
                                <div key={update} className="update">
                                    <div className="update-header">
                                        <Avatar
                                            className="avatar"
                                            size="large"
                                            src={update.by.imgUrl}
                                            type="img"
                                        />
                                        <div className="title">
                                            <span>{update.by.fullname}</span>
                                        </div>
                                        <div className="top-right">
                                            <div className="flex align-center">
                                                <Icon icon={Time} />
                                                <span>39m</span>
                                            </div>
                                            <MenuButton
                                                className="update-menu">
                                                <Menu id="menu" size="large" className="menu-modal">
                                                    <MenuItem
                                                        icon={Delete}
                                                        title="Delete"
                                                        onClick={() => onRemoveUpdate(update.id)} />
                                                </Menu>
                                            </MenuButton>
                                        </div>
                                    </div>
                                    <div className="update-body">
                                        <p>{update.text}</p>
                                    </div>
                                </div>
                            )}
                            {!task.updates.length && <div className="no-updates">
                                <div>
                                    <img src="https://cdn.monday.com/images/pulse-page-empty-state.svg" alt="" />
                                    <h2>No updates yet for this item</h2>
                                    <p>
                                        Be the first one to update about progress, mention someone <br />
                                        or upload files to share with your team members
                                    </p>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div> */}
            </section>
            <button
                className="drag-btn"
                onMouseDown={(ev) => handleMouseDown(ev)}>
                <Icon className="close-icon" icon={Drag} />
            </button>
        </section >
    )
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
}