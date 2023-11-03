import { Menu, MenuButton, Search as SearchInput, MenuItem, EditableHeading, MenuTitle, Button, MenuDivider, TabList, Tab, Table, SplitButton, SplitButtonMenu, IconButton, Icon, AvatarGroup, Avatar } from "monday-ui-react-core"
import { NavigationChevronDown, DropdownChevronDown, DropdownChevronUp, Home, Delete, Download, Group, Search, PersonRound, CloseSmall, Chart, Edit, Favorite, ShortText, Info, AddSmall, Duplicate, Table as TableIcon, Menu as MenuIcon, Invite, SettingsKnobs } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { boardService } from "../services/board.service"
import { BoardModal } from "./BoardModal"
import { MembersFilterModal } from "./MembersFilterModal"
import { useClickOutside } from "../hooks/useClickOutside"

export function BoardHeader({ onAddTaskFromHeader, board, onRemoveBoard, onSaveBoard, onDuplicateBoard, filterBy, setFilterBy, sortBy }) {

    const [isCollapse, setIsCollapse] = useState(false)
    const [isInputFocus, setIsInputFocus] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const inputRef = useRef(null)

    const personBtn = useRef();
    const { isFocus: isPersonModalOpen, setIsFocus: setIsPersonModalOpen } = useClickOutside(personBtn);

    const navigate = useNavigate()

    const activityUrl = `/board/${board._id}/activity_log`

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onSaveBoard({ board, key: 'title', value: ev.target.value })
            ev.target.blur()
        }
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    function handleInputFocus() {
        setIsInputFocus(true)
    }

    function handleInputBlur() {
        if (!inputValue) {
            setIsTyping(false)
        }
        setIsInputFocus(false)
    }

    function handleInputChange(ev) {
        setFilterBy({ ...filterBy, txt: ev.target.value })
        if (ev.target.value) {
            setIsTyping(true)
            setInputValue(ev.target.value)
        } else {
            setIsTyping(false)
        }
    }

    function handleClearInputClick() {
        inputRef.current.value = ''
        inputRef.current.focus()
        setIsTyping(false)
        setIsInputFocus(true)
    }

    function onAddGroup() {
        const newGroup = boardService.getEmptyGroup()
        const value = [newGroup, ...board.groups]
        onSaveBoard({ boardId: board._id, key: 'groups', value })
    }

    return (
        <section className={`board-header middle ${isCollapse ? 'collapse' : ''}`}>
            {!isCollapse && <section className="container first-row-container">
                <div className="title-container">
                    <EditableHeading
                        className="board-title-input"
                        type={EditableHeading.types.h1}
                        value={board.title}
                        tooltip='Click to Edit'
                        tooltipPosition="bottom"
                        customColor="#323338" //change to variable
                        onBlur={(ev) => onSaveBoard({ board, key: 'title', value: ev.target.value })}
                        onKeyDown={handleKeyPress}
                    />
                    <div>
                        <IconButton
                            iconClassName='info-icon'
                            icon={Info}
                            kind={IconButton.kinds.TERTIARY}
                            size={IconButton.sizes.SMALL}
                            ariaLabel="Show board description"
                            onClick={() => setIsModalOpen(true)} />
                        <IconButton iconClassName='info-icon' icon={Favorite} kind={IconButton.kinds.TERTIARY} size={IconButton.sizes.SMALL} ariaLabel="Add to favorites" />
                    </div>
                </div>
                <div className="options-container">
                    <Button className="activity-btn" kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} onClick={() => navigate(activityUrl)}>
                        Activity
                        <AvatarGroup max={2} size={Avatar.sizes.SMALL}>
                            <Avatar className="avatar" type={Avatar.types.IMG} src="https://style.monday.com/static/media/person1.de30c8ee.png" ariaLabel="Hadas Fahri" />
                            <Avatar className="avatar" type={Avatar.types.IMG} src="https://style.monday.com/static/media/person2.24c7233e.png" ariaLabel="Sergey Roytman" />
                            {/* <Avatar type={Avatar.types.IMG} src="https://style.monday.com/static/media/person3.3661bfe5.png" ariaLabel="Yossi Saadi" /> */}
                        </AvatarGroup>
                    </Button>
                    <Link className="btn" to='#'>
                        <Button className="invite-btn" noSidePadding={true} kind={Button.kinds.SECONDARY}>
                            <Icon className="invite-icon" icon={Invite} />
                            <span>Invite / 1</span>
                        </Button>
                    </Link>
                    <MenuButton tooltipContent='Options' tooltipPosition="top"
                        className="menu-btn" component={MenuIcon}>
                        <Menu id="menu">
                            <MenuTitle caption="Board options" captionPosition={MenuTitle.positions.TOP} />
                            <MenuItem icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename board" onClick={() => setIsModalOpen(true)} />
                            <MenuItem icon={Duplicate} iconType={MenuItem.iconType.SVG}
                                title="Duplicate board" onClick={() => { onDuplicateBoard({ boardId: board._id }) }} />
                            <MenuItem icon={Delete} iconType={MenuItem.iconType.SVG} title="Delete board"
                                onClick={() => { onRemoveBoard({ board, boardId: board._id }) }} />
                        </Menu>
                    </MenuButton>
                </div>
            </section>}
            {(!isCollapse && board.description) && <section className={`second-row-container`}>
                <div className="flex align-center">
                    <p className="board-description" onClick={() => setIsModalOpen(true)}>{board.description}</p>
                    <span className="see-more" onClick={() => setIsModalOpen(true)}>See More</span>
                </div>
            </section>}
            <section className={`container third-row-container ${!board.description ? 'no-description' : ''} ${isCollapse ? 'collapse' : ''}`}>
                <div className="board-view-container">
                    {isCollapse && <div className="title-container">
                        <EditableHeading
                            style={{ fontSize: '24px' }}
                            className="board-title-input"
                            type={EditableHeading.types.h2}
                            value={board.title}
                            tooltip='Click to Edit'
                            tooltipPosition="bottom"
                            customColor="#323338" //change to variable
                            onBlur={(ev) => onSaveBoard({ board, key: 'title', value: ev.target.value })}
                            onKeyDown={handleKeyPress}
                        />
                    </div>}
                    <TabList className="tab-list">
                        <Tab key='main' tabInnerClassName='main-tab' icon={Home}>Main Table</Tab>
                        <Tab key='kanban' tabInnerClassName='tab'>Kanban</Tab>
                    </TabList>
                    <div>
                        <MenuButton tooltipContent='Add View' className="add-button" component={AddSmall} >
                            <Menu id="menu" size={Menu.sizes.MEDIUM}>
                                <MenuTitle caption="Board views" captionPosition={MenuTitle.positions.TOP} />
                                <MenuItem icon={TableIcon} iconType={MenuItem.iconType.SVG} title="Table" />
                                <MenuItem icon={Chart} iconType={MenuItem.iconType.SVG} title="Chart" />
                                <MenuItem icon={CloseSmall} iconType={MenuItem.iconType.SVG} title="Kanban" />
                            </Menu>
                        </MenuButton>
                    </div>
                    {/* <TabList size="sm">
                        <Tab icon={TableIcon}>Main Table</Tab>
                        <Tab icon={TableIcon}>Chart</Tab>
                        <Tab icon={TableIcon}>Calendar</Tab>
                    </TabList> */}
                </div>
                <div className="options-container">
                    {isCollapse && <Link className="btn" to='#'>
                        <Button className="invite-btn" noSidePadding={true} kind={Button.kinds.SECONDARY}>
                            <Icon className="invite-icon" icon={Invite} />
                            <span>Invite / 1</span>
                        </Button>
                    </Link>}
                    {isCollapse && <MenuButton tooltipContent='Options' tooltipPosition="top"
                        className="menu-btn" component={MenuIcon}>
                        <Menu id="menu">
                            <MenuTitle caption="Board options" captionPosition={MenuTitle.positions.TOP} />
                            <MenuItem icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename board" onClick={() => setIsModalOpen(true)} />
                            <MenuItem icon={Duplicate} iconType={MenuItem.iconType.SVG}
                                title="Duplicate board" onClick={() => onDuplicateBoard({ boardId: board._id })} />
                            <MenuItem icon={Delete} iconType={MenuItem.iconType.SVG} title="Delete board"
                                onClick={() => { onRemove({ board, boardId: board._id }); navigate('/board') }} />
                        </Menu>
                    </MenuButton>}
                    <IconButton className='collapse-btn' icon={isCollapse ? DropdownChevronDown : DropdownChevronUp} kind={IconButton.kinds.SECONDARY}
                        size={IconButton.sizes.XXS} ariaLabel={isCollapse ? "Expand header" : "Collapse header"} onClick={() => setIsCollapse(!isCollapse)} />
                </div>
            </section>
            <MenuDivider className='menu-divider' />
            <section className="fourth-row-container">
                <SplitButton className='split-btn' children="New Item" size={SplitButton.sizes.SMALL}
                    onClick={() => onAddTaskFromHeader(board)}
                    secondaryDialogContent={<SplitButtonMenu id="split-menu">
                        <MenuItem icon={Group} title="New group of Items" onClick={onAddGroup} />
                        {/* <MenuItem icon={Download} title="import Items" /> */}
                    </SplitButtonMenu>} />
                <div className="btns-container">
                    <div className={`search-container ${isInputFocus ? 'is-focus' : ''} ${isTyping ? 'typing' : ''}`}>
                        <Icon className="search-icon" icon={Search} />
                        <input
                            className={`search-input`}
                            type="text"
                            ref={inputRef}
                            value={filterBy.txt}
                            onFocus={handleInputFocus}
                            onChange={(ev) => handleInputChange(ev)}
                            onBlur={handleInputBlur}
                            placeholder="Search" />
                        {isTyping && <Button className="clear-btn btn" kind={Button.kinds.TERTIARY} onClick={() => handleClearInputClick()}>
                            <Icon className="x-icon" icon={CloseSmall} />
                        </Button>}
                        {(isInputFocus || isTyping) && <Button className="options-btn btn" kind={Button.kinds.TERTIARY}>
                            <Icon className="setting-icon" icon={SettingsKnobs} />
                        </Button>}
                    </div>
                    <Button
                        className="person-btn relative"
                        ariaLabel="Filter by person"
                        kind={Button.kinds.TERTIARY}
                        ref={personBtn}
                        onClick={() => setIsPersonModalOpen(!isPersonModalOpen)}
                    >
                        <Icon className="setting-icon" icon={PersonRound} />
                        <span>Person</span>
                        {isPersonModalOpen &&
                            <div className="modal" onClick={(ev) => ev.stopPropagation()}>
                                <MembersFilterModal members={board.members} filterBy={filterBy} setFilterBy={setFilterBy} />
                            </div>
                        }
                    </Button>
                </div>
            </section>
            {isModalOpen && <BoardModal board={board} onSaveBoard={onSaveBoard} onCloseModal={onCloseModal} />}
        </section >
    )
}