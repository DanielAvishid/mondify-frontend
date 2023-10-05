import { Menu, MenuButton, MenuItem, EditableHeading, MenuTitle, Button, MenuDivider, TabList, Tab, Table, SplitButton, SplitButtonMenu, IconButton, Icon } from "monday-ui-react-core"
import { NavigationChevronDown, DropdownChevronDown, DropdownChevronUp, Home, Delete, Download, Group, Search, PersonRound, CloseSmall, Chart, Edit, Favorite, ShortText, Info, AddSmall, Duplicate, Table as TableIcon, Menu as MenuIcon } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function BoardHeader({ onAddTaskFromHeader, board, onRemove, onSaveBoard, onDuplicate }) {

    const [isCollapse, setIsCollapse] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const navigate = useNavigate()

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onSaveBoard({ board, key: 'title', value: ev.target.value })
            ev.target.blur()
        }
    }

    return (
        <section className="board-header middle">
            {!isCollapse && <section className="container first-container">
                <div className="title-container">
                    <EditableHeading
                        type={EditableHeading.types.h2}
                        value={board.title}
                        tooltip='Click to Edit'
                        tooltipPosition="bottom"
                        customColor="#323338" //change to variable
                        onBlur={(ev) => onSaveBoard({ board, key: 'title', value: ev.target.value })}
                        onKeyDown={handleKeyPress}
                    />
                    <MenuButton className="menu-button" component={NavigationChevronDown} size={MenuButton.sizes.XS}>
                        <Menu id="menu" size={Menu.sizes.MEDIUM}>
                            <MenuItem icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename" />
                            <MenuItem icon={Favorite} iconType={MenuItem.iconType.SVG} title="Add to favorites" />
                            <MenuItem icon={ShortText} iconType={MenuItem.iconType.SVG} title="Description" />
                            <MenuItem icon={Info} iconType={MenuItem.iconType.SVG} title="Board info" />
                        </Menu>
                    </MenuButton>
                </div>
                <div className="options-container">
                    <Link className="btn" to='#'>
                        <Button className="invite-btn" size={Button.sizes.SMALL} noSidePadding={true} kind={Button.kinds.SECONDARY}>Invite / 1</Button>
                        {/* <button>Show activity</button> */}
                        {/* <img src={board.members[0].img} alt="" />
                        {board.members[1] && <img src={board.mebmers[1].img} alt="" />} */}
                        {/* put here the extra +counter */}
                    </Link>
                    <MenuButton tooltipContent='Options' tooltipPosition="top"
                        className="menu-button" component={MenuIcon}>
                        <Menu id="menu">
                            <MenuTitle caption="Board options" captionPosition={MenuTitle.positions.TOP} />
                            <MenuItem icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename board" />
                            <MenuItem icon={Duplicate} iconType={MenuItem.iconType.SVG}
                                title="Duplicate board" onClick={() => onDuplicate({ boardId: board._id })} />
                            <MenuItem icon={Delete} iconType={MenuItem.iconType.SVG} title="Delete board"
                                onClick={() => { onRemove({ board, boardId: board._id }); navigate('/board') }} />
                        </Menu>
                    </MenuButton>
                </div>
            </section>}
            <section className="container second-container">
                <div className="board-view-container">
                    {isCollapse && <div className="title-container">
                        <EditableHeading
                            type={EditableHeading.types.h2}
                            value={board.title}
                            tooltip='Click to Edit'
                            tooltipPosition="bottom"
                            customColor="#323338" //change to variable
                            onBlur={(ev) => onSaveBoard({ board, key: 'title', value: ev.target.value })}
                            onKeyDown={handleKeyPress}
                        />
                        <MenuButton className="menu-button" component={NavigationChevronDown} size={MenuButton.sizes.XS}>
                            <Menu id="menu" size={Menu.sizes.MEDIUM}>
                                <MenuItem icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename" />
                                <MenuItem icon={Favorite} iconType={MenuItem.iconType.SVG} title="Add to favorites" />
                                <MenuItem icon={ShortText} iconType={MenuItem.iconType.SVG} title="Description" />
                                <MenuItem icon={Info} iconType={MenuItem.iconType.SVG} title="Board info" />
                            </Menu>
                        </MenuButton>
                    </div>}
                    <TabList className="tab-list">
                        <Tab tabInnerClassName='tab' icon={Home}>Main Table</Tab>
                        <Tab>Kanban</Tab>
                    </TabList>
                    <MenuButton className="menu-button" component={AddSmall} size={MenuButton.sizes.SMALL}>
                        <Menu id="menu" size={Menu.sizes.MEDIUM}>
                            <MenuTitle caption="Board views" captionPosition={MenuTitle.positions.TOP} />
                            <MenuItem icon={TableIcon} iconType={MenuItem.iconType.SVG} title="Table" />
                            <MenuItem icon={Chart} iconType={MenuItem.iconType.SVG} title="Chart" />
                            <MenuItem icon={CloseSmall} iconType={MenuItem.iconType.SVG} title="Kanban" />
                        </Menu>
                    </MenuButton>
                    {/* <TabList size="sm">
                        <Tab icon={TableIcon}>Main Table</Tab>
                        <Tab icon={TableIcon}>Chart</Tab>
                        <Tab icon={TableIcon}>Calendar</Tab>
                    </TabList> */}
                </div>
                <div className="options-container">
                    {isCollapse && <Link className="btn" to='#'>
                        <Button className="invite-btn" size={Button.sizes.SMALL} noSidePadding={true} kind={Button.kinds.SECONDARY}>Invite / 1</Button>
                    </Link>}
                    {isCollapse && <MenuButton tooltipContent='Options' tooltipPosition="top"
                        className="menu-button" component={MenuIcon}>
                        <Menu id="menu">
                            <MenuTitle caption="Board options" captionPosition={MenuTitle.positions.TOP} />
                            <MenuItem icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename board" />
                            <MenuItem icon={Duplicate} iconType={MenuItem.iconType.SVG}
                                title="Duplicate board" onClick={() => onDuplicate({ boardId: board._id })} />
                            <MenuItem icon={Delete} iconType={MenuItem.iconType.SVG} title="Delete board"
                                onClick={() => { onRemove({ board, boardId: board._id }); navigate('/board') }} />
                        </Menu>
                    </MenuButton>}
                    <IconButton key="large" className='icon-btn' icon={DropdownChevronUp} kind={IconButton.kinds.SECONDARY}
                        size={IconButton.sizes.SMALL} ariaLabel="Collapse header" onClick={() => setIsCollapse(!isCollapse)} />
                </div>
            </section>
            <MenuDivider className='menu-divider' />
            <section className="third-container">
                <SplitButton className='split-button' children="New Item" size={SplitButton.sizes.MEDIUM}
                    onClick={() => onAddTaskFromHeader(board)}
                    secondaryDialogContent={<SplitButtonMenu id="split-menu">
                        <MenuItem icon={Group} title="New group of Items" />
                        <MenuItem icon={Download} title="import Items" />
                    </SplitButtonMenu>} />
                <div className="btns-container">
                    <Button kind={Button.kinds.TERTIARY}>
                        <Icon iconType={Icon.type.SVG} icon={Search} iconLabel="my bolt svg icon" iconSize={22} />
                        Search
                    </Button>
                    <Button kind={Button.kinds.TERTIARY}>
                        <Icon iconType={Icon.type.SVG} icon={PersonRound} iconLabel="my bolt svg icon" iconSize={22} />
                        Person
                    </Button>
                </div>
            </section>
            {/* <DialogContentContainer type={DialogContentContainer.types.MODAL}>
                <h1>HIII</h1>
            </DialogContentContainer> */}
        </section>
    )
}