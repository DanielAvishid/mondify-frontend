import { Menu, MenuButton, MenuItem, EditableHeading, MenuTitle, Button, MenuDivider, TabList, Tab, Table } from "monday-ui-react-core"
// import { DialogContentContainer } from "monday-ui-react-core/next";
import { NavigationChevronDown, CloseSmall, Chart, Edit, Favorite, ShortText, Info, AddSmall, Table as TableIcon, Menu as MenuIcon } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useState } from "react"
import { Link } from "react-router-dom"

export function BoardHeader({ board, onRemoveBoard, onUpdateBoard }) {

    const [isCollapse, setIsCollapse] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onUpdateBoard('title', ev.target.value, board)
            ev.target.blur()
        }
    }

    return (
        <section className="board-header">
            <section className="container">
                <div className="title-container">
                    <EditableHeading
                        className="title"
                        type={EditableHeading.types.h2}
                        value={board.title}
                        tooltip='Click to Edit'
                        tooltipPosition="bottom"
                        customColor="#323338" //change to variable
                        onBlur={(ev) => onUpdateBoard('title', ev.target.value, board)}
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
                            <MenuItem icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename" />
                            <MenuItem icon={Favorite} iconType={MenuItem.iconType.SVG} title="Add to favorites" />
                            <MenuItem icon={ShortText} iconType={MenuItem.iconType.SVG} title="Description" />
                            <MenuItem icon={Info} iconType={MenuItem.iconType.SVG} title="Board info" />
                        </Menu>
                    </MenuButton>
                </div>
            </section>
            <section className="container">
                <div className="board-view-container">
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
                <MenuDivider />

            </section>
            <MenuDivider />
            {/* <DialogContentContainer type={DialogContentContainer.types.MODAL}>
                <h1>HIII</h1>
            </DialogContentContainer> */}
        </section>
    )
}