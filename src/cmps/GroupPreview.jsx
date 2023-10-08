import { EditableHeading, IconButton, Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Add, Duplicate, Delete } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { TaskPreview } from "./TaskPreview";
import { utilService } from "../services/util.service";
import { boardService } from "../services/board.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

export function GroupPreview({ board, group, onSaveBoard, progress, onRemove, onDuplicate }) {
    // DELETE THIS LINES WHEN GIVEN CURRECT PROP

    const { style, title } = group
    const [tasks, setTasks] = useState(group.tasks)

    useEffect(() => {
        setTasks(group.tasks)
    }, [group])

    function onAddTask(title) {
        if (title === '') return
        const newTask = boardService.getEmptyTask(title)
        const value = [...group.tasks, newTask]
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


    return (
        <section className="group-preview main-layout full grid align-center justify-center">
            <div className="group-header main-layout full">
                <div className="start grid justify-center">
                    <MenuButton className="board-menu">
                        <Menu id="menu" size="large">
                            <MenuItem icon={Duplicate} title="Duplicate this group" onClick={() => onDuplicate({ boardId: board._id, groupId: group.id })} />
                            <MenuItem icon={Delete} title="Delete" onClick={() => onRemove({ boardId: board._id, groupId: group.id })} />
                        </Menu>
                    </MenuButton>
                </div>

                <div className="group-title grid align-center">
                    <EditableHeading
                        type={EditableHeading.types.h4}
                        value={title}
                        tooltip='Click to Edit'
                        tooltipPosition="bottom"
                        customColor={group.style.backgroundImage}
                        onBlur={(ev) => onSaveBoard({ key: 'title', value: ev.target.value, boardId: board._id, groupId: group.id })}
                        onKeyDown={handleKeyPress}
                    />
                </div>
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="task" type="group">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className=" main-layout full">
                            <div className="table-header table-grid table">
                                <div className="side first" style={{ backgroundColor: group.style.backgroundColor }}></div>
                                <div className="checkbox grid"><input type="checkbox" /></div>
                                <div className="title-col grid align-center justify-center"><span>Item</span></div>

                                {board.cmpsOrder.map((cmp, idx) => (
                                    <div key={idx} className={`${cmp.toLowerCase()}-col grid align-center justify-center`}>
                                        <span>{cmp}</span>
                                    </div>
                                ))}

                                <div className="last-col grid align-center">
                                    <IconButton icon={Add} kind={IconButton.kinds.TERTIARY} ariaLabel="Add Column" size={IconButton.sizes.SMALL} />
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
                                                onDuplicate={onDuplicate}
                                                onRemove={onRemove} />
                                        </article>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            <div className="main-layout full">
                                <div className="start"></div>
                                <div className="add-task table-grid table">
                                    <div className="side" style={{ backgroundColor: group.style.backgroundColor, opacity: 0.6 }}></div>
                                    <div className="checkbox grid"><input type="checkbox" /></div>
                                    <div className="title-col grid align-center">
                                        <EditableHeading
                                            type={EditableHeading.types.h5}
                                            placeholder={"+Add Item"}
                                            tooltip='Click to Edit'
                                            tooltipPosition="bottom"
                                            customColor="#323338"
                                            onFinishEditing={onAddTask}
                                        />
                                    </div>
                                </div>
                                <div className="last-col"></div>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section >
    )
}



