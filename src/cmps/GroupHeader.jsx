import { Checkbox, EditableHeading, Icon, IconButton, Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Add, Duplicate, Delete, DropdownChevronDown, Minimize, Open } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"

export function GroupHeader({ group, board, onSaveBoard, onDuplicateGroup, onRemoveGroup,
    masterChecked, handleMasterChange, handleKeyPress, isCollapse, setIsCollapse, updateIsCollapse }) {

    const { title } = group

    return (
        <div className="group-header main-layout full">
            {/* <div className="group-header main-layout full"> */}
            <div className="title-header main-layout full">
                <div className="group-menu-container start flex justify-end align-center">
                    <MenuButton className="group-menu">
                        <Menu id="menu" size="large">
                            <MenuItem icon={Open} title="Expand all groups" onClick={() => updateIsCollapse(false, isCollapse)} />
                            <MenuItem icon={Minimize} title="Collapse all groups" onClick={() => updateIsCollapse(true, isCollapse)} />
                            <MenuItem icon={Duplicate} title="Duplicate this group" onClick={() => onDuplicateGroup({ boardId: board._id, groupId: group.id })} />
                            <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveGroup({ boardId: board._id, groupId: group.id })} />
                        </Menu>
                    </MenuButton>
                </div>
                <div className="group-title flex align-center">
                    <span className="arrow-icon flex" style={{ color: group.style.backgroundColor }}>

                        <Icon
                            customColor={group.style.backgroundColor}
                            icon={DropdownChevronDown}
                            iconSize={22}
                            ariaLabel="Collapse group"
                            onClick={() => setIsCollapse({ ...isCollapse, [group.id]: true })}
                        />
                    </span>
                    <span className="group-title-edit flex align-center">
                        <EditableHeading
                            type={EditableHeading.types.h4}
                            value={title}
                            tooltip='Click to Edit'
                            tooltipPosition="bottom"
                            customColor={group.style.backgroundColor}
                            onBlur={(ev) => onSaveBoard({ key: 'title', value: ev.target.value, boardId: board._id, groupId: group.id })}
                            onKeyDown={(ev) => handleKeyPress(ev, 'title')}
                        />
                        <span className="items-count">
                            {group.tasks.length === 0 && "No items"}
                            {group.tasks.length === 1 && "1 project"}
                            {group.tasks.length > 1 && `${group.tasks.length} Items`}
                        </span>
                    </span>
                </div>
            </div>
            <table className="table-header full main-layout">
                <thead className="table-container table first" style={{ borderColor: group.style.backgroundColor }}>
                    <tr className="table-row flex">
                        <th className=" title-col flex align-center justify-center">
                            <div className="checkbox flex align-center justify-center"><Checkbox checked={masterChecked} onChange={handleMasterChange} /></div>
                            <div className="title-name flex align-center justify-center"><span>Item</span></div>
                        </th>
                        {board.cmpsOrder.map((cmp, idx) => (
                            <th key={idx} className={` cmp-title ${cmp.type}-col flex align-center justify-center`}>
                                <div className="inner-container">
                                    <span>
                                        <EditableHeading
                                            type={EditableHeading.types.h6}
                                            value={cmp.title}
                                            // customColor={group.style.backgroundColor}
                                            // onBlur={(ev) => onSaveBoard({ key: 'title', value: ev.target.value, boardId: board._id, groupId: group.id })}
                                            onKeyDown={(ev) => handleKeyPress(ev, 'cmpsOrder', cmp.id)}
                                        />
                                    </span>
                                </div>
                            </th>
                        ))}
                        <th className="add-column">
                            <IconButton className="add-btn" icon={Add} kind={IconButton.kinds.TERTIARY} ariaLabel="Add Column" />
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}