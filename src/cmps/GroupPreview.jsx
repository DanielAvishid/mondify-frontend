import { Checkbox, EditableHeading, Icon, IconButton, Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Add, Duplicate, Delete, DropdownChevronDown } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { TaskPreview } from "./TaskPreview";
import { utilService } from "../services/util.service";
import { boardService } from "../services/board.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";

export function GroupPreview({ board, group, onSaveBoard, progress, onRemoveGroup, onRemoveTask, onDuplicateGroup, onDuplicateTask }) {
    // DELETE THIS LINES WHEN GIVEN CURRECT PROP


    const { style, title } = group
    const [tasks, setTasks] = useState(group.tasks)
    const [addTaskBgc, setAddTaskBgc] = useState('')
    const [addTaskTitle, setAddTaskTitle] = useState('')

    const tasksCheck = tasks.reduce((acc, task) => {
        acc[task.id] = false;
        return acc;
    }, {})

    const [checkboxes, setCheckboxes] = useState(tasksCheck);
    const [masterChecked, setMasterChecked] = useState(false);

    const handleMasterChange = () => {
        setMasterChecked(!masterChecked);
        const updatedCheckboxes = { ...checkboxes };

        // Set all checkboxes to the state of the master checkbox
        for (const taskId in updatedCheckboxes) {
            updatedCheckboxes[taskId] = !masterChecked;
        }

        setCheckboxes(updatedCheckboxes);
    }

    const handleCheckboxChange = (taskId) => {
        const updatedCheckboxes = { ...checkboxes };
        updatedCheckboxes[taskId] = !updatedCheckboxes[taskId];
        setCheckboxes(updatedCheckboxes);

        // Update master checkbox state based on individual checkboxes
        const allChecked = Object.values(updatedCheckboxes).every((value) => value);
        setMasterChecked(allChecked);
    }

    useEffect(() => {
        setTasks(group.tasks)
    }, [group])

    function onAddTask(title) {
        setAddTaskBgc('')
        if (title === '') return
        const newTask = boardService.getEmptyTask(title)
        const value = [...group.tasks, newTask]
        setAddTaskTitle('')
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
        setAddTaskBgc('focus-bgc')
    }

    function handleAddTask(ev) {
        if (ev.key === 'Enter') {
            onAddTask(ev.target.value)
        }
    }

    return (
        <section className="group-preview main-layout full grid align-center justify-center">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="task" type="group">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className=" main-layout full">
                            <div className="group-header main-layout full">

                                <div className="title-header main-layout full">
                                    <div className="start grid justify-center">
                                        <MenuButton className="board-menu">
                                            <Menu id="menu" size="large">
                                                <MenuItem icon={Duplicate} title="Duplicate this group" onClick={() => onDuplicateGroup({ boardId: board._id, groupId: group.id })} />
                                                <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveGroup({ boardId: board._id, groupId: group.id })} />
                                            </Menu>
                                        </MenuButton>
                                    </div>
                                    <div className="flex align-center">
                                        <span className="flex" style={{ color: group.style.backgroundColor }}>
                                            {/* cant get the label . why ? */}

                                            <Icon
                                                customColor={group.style.backgroundColor}
                                                icon={DropdownChevronDown}
                                                iconSize={22}
                                                ariaLabel="Collapse group" />
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
                                            {group.tasks.length > 1 && `${group.tasks.length} projects`}
                                        </span>
                                    </div>
                                </div>

                                <div className="table-header table-grid table">
                                    <div className="side first" style={{ backgroundColor: group.style.backgroundColor }}></div>
                                    <div className="checkbox grid align-center"><Checkbox checked={masterChecked} onChange={handleMasterChange} /></div>
                                    <div className="title-col grid align-center justify-center"><span>Item</span></div>

                                    {board.cmpsOrder.map((cmp, idx) => (
                                        <div key={idx} className={`${cmp.type}-col grid align-center justify-center`}>
                                            <span>
                                                <EditableHeading
                                                    type={EditableHeading.types.h6}
                                                    value={cmp.title}
                                                    tooltipPosition="bottom"
                                                // customColor={group.style.backgroundColor}
                                                // onBlur={(ev) => onSaveBoard({ key: 'title', value: ev.target.value, boardId: board._id, groupId: group.id })}
                                                // onKeyDown={handleKeyPress}
                                                />
                                            </span>
                                        </div>
                                    ))}

                                    <div className="last-col grid align-center">
                                        <IconButton icon={Add} kind={IconButton.kinds.TERTIARY} ariaLabel="Add Column" size={IconButton.sizes.SMALL} />
                                    </div>
                                </div>
                            </div>

                            {tasks.map((task, index) => (
                                <Draggable draggableId={task.id} index={index} key={task.id}>
                                    {(provided) => (
                                        <article
                                            className=" main-layout full"
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
                                        </article>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}

                            <div className="group-footer full">
                                <div className="main-layout full">
                                    <div className={`add-task table-grid table ${addTaskBgc}`}>
                                        <div className="side" style={{ backgroundColor: group.style.backgroundColor, opacity: 0.6 }}></div>
                                        <div className="checkbox grid align-center align-center"><Checkbox disabled /></div>
                                        <div className="title-col grid align-center">
                                            <input
                                                type="text"
                                                placeholder={"+ Add Item"}
                                                value={addTaskTitle}
                                                onBlur={(ev) => onAddTask(ev.target.value)}
                                                onFocus={onChangeBgc}
                                                onChange={(ev) => setAddTaskTitle(ev.target.value)}
                                                onKeyPress={handleAddTask}
                                            />
                                        </div>
                                        <div className="last-col"></div>
                                    </div>
                                    <ProgressBar board={board} group={group} />
                                </div>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section >
    )
}



