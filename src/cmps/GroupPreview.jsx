
import { Checkbox, EditableHeading, Icon, IconButton, Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Add, Duplicate, Delete, DropdownChevronDown, Minimize, Open } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { TaskPreview } from "./TaskPreview";
import { utilService } from "../services/util.service";
import { boardService } from "../services/board.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { GroupPreviewCollapse } from "./GroupPreviewCollapse";

import { SET_SELECTED_TASKS } from "../store/reducers/board.reducer"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GroupFooter } from "./GroupFooter";
import { TaskList } from "./TaskList";

export function GroupPreview({ index, board, group, onSaveBoard, onRemoveGroup, onRemoveTask, onDuplicateGroup, onDuplicateTask, isCollapse, setIsCollapse, updateIsCollapse }) {
    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)
    const dispatch = useDispatch()

    const { title } = group
    const [tasks, setTasks] = useState(group.tasks)

    const tasksCheck = tasks.reduce((acc, task) => {
        acc[task.id] = false;
        return acc;
    }, {})

    const [checkboxes, setCheckboxes] = useState(tasksCheck);
    const [masterChecked, setMasterChecked] = useState(false);

    useEffect(() => {
        setTasks(group.tasks)
    }, [group])

    useEffect(() => {
        if (Object.keys(selectedTasks).length === 0) {
            setCheckboxes(tasksCheck)
            setMasterChecked(false)
        }
    }, [selectedTasks])


    const handleMasterChange = () => {
        setMasterChecked(!masterChecked);
        const updatedCheckboxes = { ...checkboxes };

        for (const taskId in updatedCheckboxes) {
            updatedCheckboxes[taskId] = !masterChecked;
        }

        setCheckboxes(updatedCheckboxes);

        const updatedSelectedTasks = { ...selectedTasks };

        if (!masterChecked) {
            updatedSelectedTasks[group.id] = Object.keys(checkboxes).reduce((acc, taskId) => {
                acc[taskId] = true;
                return acc;
            }, {});
        } else {
            delete updatedSelectedTasks[group.id];
        }

        dispatch({ type: SET_SELECTED_TASKS, selectedTasks: updatedSelectedTasks })
    }

    const handleCheckboxChange = (taskId) => {
        const updatedCheckboxes = { ...checkboxes };
        updatedCheckboxes[taskId] = !updatedCheckboxes[taskId];
        setCheckboxes(updatedCheckboxes);

        const updatedSelectedTasks = { ...selectedTasks };
        if (!updatedSelectedTasks[group.id]) {
            updatedSelectedTasks[group.id] = {};
        }

        if (updatedCheckboxes[taskId]) {
            updatedSelectedTasks[group.id][taskId] = true;
        } else {
            delete updatedSelectedTasks[group.id][taskId];
        }

        if (Object.keys(updatedSelectedTasks[group.id]).length === 0) {
            delete updatedSelectedTasks[group.id];
        }

        dispatch({ type: SET_SELECTED_TASKS, selectedTasks: updatedSelectedTasks })

        const allChecked = Object.values(updatedCheckboxes).every((value) => value);
        setMasterChecked(allChecked);
    }

    function handleKeyPress(ev, key, idValue) {
        console.log(ev);

        if (ev.key === 'Enter') {

            if (key === 'title') {
                onSaveBoard(({ key, value: ev.target.value, boardId: board._id, groupId: group.id }))
            } else if (key === 'cmpsOrder') {
                const updatedCmpsOrder = board.cmpsOrder.map(cmp => {
                    if (cmp.id === idValue) {
                        return { ...cmp, title: ev.target.value }
                    }
                    return cmp;
                })

                onSaveBoard({ key, value: [...updatedCmpsOrder], boardId: board._id })
            }

            ev.target.blur()
        }
    }

    if (isCollapse[group.id]) return (
        <GroupPreviewCollapse index={index} handleKeyPress={handleKeyPress} board={board}
            group={group} onDuplicateGroup={onDuplicateGroup} onSaveBoard={onSaveBoard}
            onRemoveGroup={onRemoveGroup} isCollapse={isCollapse} setIsCollapse={setIsCollapse}
            updateIsCollapse={updateIsCollapse} />
    )

    return (
        <Draggable draggableId={group.id} index={index}>
            {(provider) => (
                <div
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                    ref={provider.innerRef}
                    className="group-preview main-layout full flex align-center justify-center"
                >

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

                    <TaskList
                        index={index}
                        board={board}
                        group={group}
                        onSaveBoard={onSaveBoard}
                        onDuplicateTask={onDuplicateTask}
                        onRemoveTask={onRemoveTask}
                        checkboxes={checkboxes}
                        handleCheckboxChange={handleCheckboxChange}
                    />

                    <GroupFooter group={group} board={board} onSaveBoard={onSaveBoard} />

                </div>
            )}
        </Draggable >
    )
}
