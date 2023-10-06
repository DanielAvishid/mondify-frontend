import { EditableHeading, IconButton, Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Add, Duplicate, Delete } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { TaskPreview } from "./TaskPreview";
import { utilService } from "../services/util.service";
import { boardService } from "../services/board.service";

export function GroupPreview({ board, group, onSaveBoard, progress, onRemove, onDuplicate }) {
    // DELETE THIS LINES WHEN GIVEN CURRECT PROP

    const { style, tasks, title } = group

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

    return (
        <section className="group-preview main-layout full grid align-center justify-center">

            <div className="start grid justify-center">
                <MenuButton className="board-menu">
                    <Menu id="menu" size="large">
                        {/* <MenuItem icon={Duplicate} title="Duplicate Boarder" /> */}
                        <MenuItem icon={Duplicate} title="Duplicate this group" onClick={() => onDuplicate({ boardId: board._id, groupId: group.id })} />
                        <MenuItem icon={Delete} title="Delete" onClick={() => onRemove({ boardId: board._id, groupId: group.id })} />
                    </Menu>
                </MenuButton>
            </div>

            <div>
                <EditableHeading
                    type={EditableHeading.types.h4}
                    value={title}
                    tooltip='Click to Edit'
                    tooltipPosition="bottom"
                    customColor="#323338"
                    onBlur={(ev) => onSaveBoard({ key: 'title', value: ev.target.value, boardId: board._id, groupId: group.id })}
                    onKeyDown={handleKeyPress}
                />
            </div>

            <section className="main-layout full">
                <div className="table-header table-grid middle">
                    <div className="side"></div>
                    <div className="checkbox grid"><input type="checkbox" /></div>
                    <div className="title-col grid align-center justify-center"><span>Item</span></div>

                    {board.cmpsOrder.map((label, idx) => (
                        <div key={idx} className={`${utilService.formatString(label)}-col grid align-center justify-center`}>
                            <span>{label}</span>
                        </div>
                    ))}

                    <div className="last-col grid align-center">
                        <IconButton icon={Add} kind={IconButton.kinds.TERTIARY} ariaLabel="Add Column" size={IconButton.sizes.SMALL} />
                    </div>
                </div>

                {tasks.map((task) => (
                    <TaskPreview
                        key={task.id}
                        board={board}
                        group={group}
                        task={task}
                        onSaveBoard={onSaveBoard}
                        onDuplicate={onDuplicate}
                        onRemove={onRemove} />
                ))}

                <div className="start"></div>
                <div className="add-task table-grid middle">
                    <div className="side"></div>
                    <div className="checkbox grid"><input type="checkbox" /></div>
                    <div className="grid justify-center align-center">
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

            </section>
        </section>
    )
}