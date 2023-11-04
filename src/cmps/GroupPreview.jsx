
import { Checkbox, EditableHeading, Icon, IconButton, Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Add, Duplicate, Delete, DropdownChevronDown, Minimize, Open } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { TaskPreview } from "./TaskPreview";
import { utilService } from "../services/util.service";
import { boardService } from "../services/board.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { GroupPreviewCollapse } from "./GroupPreviewCollapse";

import { ADD_SELECTED_TASKS, REMOVE_SELECTED_TASKS, SET_SELECTED_TASKS } from "../store/reducers/board.reducer"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export function GroupPreview({ index, board, group, onSaveBoard, onRemoveGroup, onRemoveTask, onDuplicateGroup, onDuplicateTask, isCollapse, setIsCollapse, updateIsCollapse }) {
    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)
    const dispatch = useDispatch()
    console.log(selectedTasks);

    const [opacity, setOpacity] = useState('80')
    const { style, title } = group
    const [tasks, setTasks] = useState(group.tasks)
    const [addTaskBgc, setAddTaskBgc] = useState('')
    const [taskTitleToAdd, setTaskTitleToAdd] = useState('')

    useEffect(() => {
        setTasks(group.tasks)
    }, [group])

    const tasksCheck = tasks.reduce((acc, task) => {
        acc[task.id] = false;
        return acc;
    }, {})

    const [checkboxes, setCheckboxes] = useState(tasksCheck);
    const [masterChecked, setMasterChecked] = useState(false);

    const handleMasterChange = () => {
        setMasterChecked(!masterChecked);
        const updatedCheckboxes = { ...checkboxes };

        for (const taskId in updatedCheckboxes) {
            updatedCheckboxes[taskId] = !masterChecked;
        }

        const updatedSelectedTasks = { ...selectedTasks, [group.id]: updatedCheckboxes };
        console.log('updatedSelectedTasks', updatedSelectedTasks);

        dispatch({ type: SET_SELECTED_TASKS, selectedTasks: updatedSelectedTasks })

        setCheckboxes(updatedCheckboxes);
    }

    const handleCheckboxChange = (taskId) => {
        const updatedCheckboxes = { ...checkboxes };
        updatedCheckboxes[taskId] = !updatedCheckboxes[taskId];
        setCheckboxes(updatedCheckboxes);

        const updatedSelectedTasks = { ...selectedTasks };
        if (!updatedSelectedTasks[group.id]) {
            updatedSelectedTasks[group.id] = {};
        }
        updatedSelectedTasks[group.id][taskId] = updatedCheckboxes[taskId];

        dispatch({ type: SET_SELECTED_TASKS, selectedTasks: updatedSelectedTasks })

        const allChecked = Object.values(updatedCheckboxes).every((value) => value);
        setMasterChecked(allChecked);
    }

    function onAddTask(title) {
        setAddTaskBgc('')
        setOpacity('80')
        if (title === '') return
        const newTask = boardService.getEmptyTask(title)
        const value = [...group.tasks, newTask]
        setTaskTitleToAdd('')
        onSaveBoard({ boardId: board._id, groupId: group.id, key: 'tasks', value })
    }

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onSaveBoard(({ key: 'title', value: ev.target.value, boardId: board._id, groupId: group.id }))
            ev.target.blur()
        }
    }

    function handleOnDragEnd(result) {
        console.log(result);
        if (!result.destination) return;
        const value = [...tasks]
        const task = value.splice(result.source.index, 1)[0];
        value.splice(result.destination.index, 0, task)
        console.log(value);
        onSaveBoard({ boardId: board._id, groupId: group.id, key: 'tasks', value })
        setTasks(value)
    }

    function onChangeBgc() {
        setOpacity('')
        setAddTaskBgc('focus-bgc')
    }

    function handleAddTask(ev) {
        if (ev.key === 'Enter') {
            onAddTask(ev.target.value)
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
                                <span className="flex" style={{ color: group.style.backgroundColor }}>

                                    <Icon
                                        customColor={group.style.backgroundColor}
                                        icon={DropdownChevronDown}
                                        iconSize={22}
                                        ariaLabel="Collapse group"
                                        onClick={() => setIsCollapse({ ...isCollapse, [group.id]: true })}
                                    />
                                </span>
                                <span>
                                    <EditableHeading
                                        type={EditableHeading.types.h4}
                                        value={title}
                                        tooltip='Click to Edit'
                                        tooltipPosition="bottom"
                                        customColor={group.style.backgroundColor}
                                        onBlur={(ev) => onSaveBoard({ key: 'title', value: ev.target.value, boardId: board._id, groupId: group.id })}
                                        onKeyDown={handleKeyPress}
                                    />
                                </span>
                                <span className="items-count">
                                    {group.tasks.length === 0 && "No items"}
                                    {group.tasks.length === 1 && "1 project"}
                                    {group.tasks.length > 1 && `${group.tasks.length} Items`}
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
                                                    // onKeyDown={handleKeyPress}
                                                    />
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                    <th className="add-column">
                                        <IconButton icon={Add} kind={IconButton.kinds.TERTIARY} ariaLabel="Add Column" size={IconButton.sizes.SMALL} />
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    <Droppable droppableId={group.id}>
                        {(provided) => (
                            <div
                                className="task-list"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {tasks.map((task, index) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                key={task.id}
                                                className="dnd-task main-layout full"
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                            >
                                                <TaskPreview
                                                    key={task.id}
                                                    board={board}
                                                    group={group}
                                                    task={task}
                                                    onSaveBoard={onSaveBoard}
                                                    onDuplicateTask={onDuplicateTask}
                                                    onRemoveTask={onRemoveTask}
                                                    isChecked={checkboxes[task.id]}
                                                    handleCheckboxChange={handleCheckboxChange}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className="group-footer full main-layout">
                        <table className="add-task full main-layout" onMouseEnter={() => setOpacity('')} onMouseLeave={() => setOpacity('80')}>
                            <tbody className={`table-container table last ${addTaskBgc}`} style={{ borderColor: group.style.backgroundColor + opacity }}>
                                <tr className="table-row flex">
                                    <td className=" title-col flex align-center justify-center">
                                        <div className="checkbox flex align-center justify-center"><Checkbox disabled /></div>
                                        <div className="title-name flex align-center justify-center">
                                            <input
                                                type="text"
                                                placeholder={"+ Add Item"}
                                                value={taskTitleToAdd}
                                                onBlur={(ev) => onAddTask(ev.target.value)}
                                                onFocus={onChangeBgc}
                                                onChange={(ev) => setTaskTitleToAdd(ev.target.value)}
                                                onKeyPress={handleAddTask}
                                            />
                                            <span className="guidance" style={{ opacity: taskTitleToAdd ? 1 : 0 }}>Enter to add another item</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <ProgressBar board={board} group={group} />
                    </div>

                </div>
            )}
        </Draggable >
    )
}
