import { Menu, MenuButton, Search as SearchInput, MenuItem, EditableHeading, MenuTitle, Button, MenuDivider, TabList, Tab, Table, SplitButton, SplitButtonMenu, IconButton, Icon, AvatarGroup, Avatar } from "monday-ui-react-core"
import { NavigationChevronDown, DropdownChevronDown, DropdownChevronUp, Home, Delete, Download, Group, Search, PersonRound, CloseSmall, Chart, Edit, Favorite, ShortText, Info, AddSmall, Duplicate, Table as TableIcon, Menu as MenuIcon, Invite, SettingsKnobs } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function BoardHeader({ onAddTaskFromHeader, board, onRemoveBoard, onSaveBoard, onDuplicateBoard }) {

    const [isCollapse, setIsCollapse] = useState(false)
    const [isInputFocus, setIsInputFocus] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)
    const navigate = useNavigate()

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onSaveBoard({ board, key: 'title', value: ev.target.value })
            ev.target.blur()
        }
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
                        <IconButton iconClassName='info-icon' icon={Info} kind={IconButton.kinds.TERTIARY} size={IconButton.sizes.SMALL} ariaLabel="Show board description" />
                        <IconButton iconClassName='info-icon' icon={Favorite} kind={IconButton.kinds.TERTIARY} size={IconButton.sizes.SMALL} ariaLabel="Add to favorites" />
                    </div>
                </div>
                <div className="options-container">
                    <Button className="activity-btn" kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>
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
                            <MenuItem icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename board" />
                            <MenuItem icon={Duplicate} iconType={MenuItem.iconType.SVG}
                                title="Duplicate board" onClick={() => { onDuplicateBoard({ boardId: board._id }) }} />
                            <MenuItem icon={Delete} iconType={MenuItem.iconType.SVG} title="Delete board"
                                onClick={() => { onRemoveBoard({ board, boardId: board._id }) }} />
                        </Menu>
                    </MenuButton>
                </div>
            </section>}
            {!isCollapse && <section className="second-row-container">
                <div className="flex align-center">
                    <p className="board-description">{board.description}</p>
                    <span className="see-more">See More</span>
                </div>
            </section>}
            <section className="container third-row-container">
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
                        {/* <Link to=''> */}
                        <Tab tabInnerClassName='main-tab' icon={Home}>Main Table </Tab>
                        {/* </Link> */}
                        {/* <Link to='views/kanban'> */}
                        <Tab tabInnerClassName='tab'>Kanban</Tab>
                        {/* </Link> */}
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
                            <MenuItem icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename board" />
                            <MenuItem icon={Duplicate} iconType={MenuItem.iconType.SVG}
                                title="Duplicate board" onClick={() => onDuplicateBoard({ boardId: board._id })} />
                            <MenuItem icon={Delete} iconType={MenuItem.iconType.SVG} title="Delete board"
                                onClick={() => { onRemove({ board, boardId: board._id }); navigate('/board') }} />
                        </Menu>
                    </MenuButton>}
                    <IconButton className='collapse-btn' icon={isCollapse ? DropdownChevronDown : DropdownChevronUp} kind={IconButton.kinds.SECONDARY}
                        size={IconButton.sizes.XXS} ariaLabel={isCollapse ? 'Expand header' : 'Collapse header'} onClick={() => setIsCollapse(!isCollapse)} />
                </div>
            </section>
            <MenuDivider className='menu-divider' />
            <section className="fourth-row-container">
                <SplitButton className='split-btn' children="New Item" size={SplitButton.sizes.SMALL}
                    onClick={() => onAddTaskFromHeader(board)}
                    secondaryDialogContent={<SplitButtonMenu id="split-menu">
                        <MenuItem icon={Group} title="New group of Items" />
                        <MenuItem icon={Download} title="import Items" />
                    </SplitButtonMenu>} />
                <div className="btns-container">
                    <div className={`search-container ${isInputFocus ? 'focus' : ''} ${isTyping ? 'typing' : ''}`}>
                        <Icon className="search-icon" icon={Search} />
                        <input
                            className={`search-input`}
                            type="text"
                            ref={inputRef}
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
                    <Button size={Button.sizes.SMALL} kind={Button.kinds.TERTIARY}>
                        <Icon iconType={Icon.type.SVG} icon={PersonRound} iconLabel="my bolt svg icon" iconSize={22} />
                        Person
                    </Button>
                </div>
            </section>
        </section >
    )
}