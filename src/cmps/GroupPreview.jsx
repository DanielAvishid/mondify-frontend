import { EditableHeading, IconButton, Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Add, Duplicate, Delete } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { TaskPreview } from "./TaskPreview";
import { utilService } from "../services/util.service";

export function GroupPreview({ boardId, group, onSaveBoard, progress, onRemove, onDuplicate }) {
    // DELETE THIS LINES WHEN GIVEN CURRECT PROP
    const cmpsOrder = ['Members', 'Status', 'Priority', 'DueDate']
    const labels = ["Members", "Status", "Priority", "Due Date"];

    const { style, tasks, title } = group

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onSaveBoard(({ key: 'title', value: ev.target.value, boardId, groupId: group.id }))
            ev.target.blur()
        }
    }

    return (
        <section className="group-preview main-layout full grid align-center justify-center">

            <div className="start grid justify-center">
                <MenuButton className="board-menu">
                    <Menu id="menu" size="large">
                        {/* <MenuItem icon={Duplicate} title="Duplicate Boarder" /> */}
                        <MenuItem icon={Duplicate} title="Duplicate Boarder" onClick={() => onDuplicate({ boardId, groupId: group.id })} />
                        <MenuItem icon={Delete} title="Delete" onClick={() => onRemove({ boardId, groupId: group.id })} />
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
                    onBlur={(ev) => onSaveBoard({ key: 'title', value: ev.target.value, boardId, groupId: group.id })}
                    onKeyDown={handleKeyPress}
                />
            </div>

            <section className="main-layout full">
                <div className="table-header table-grid middle">
                    <div className="side"></div>
                    <div className="checkbox grid"><input type="checkbox" /></div>
                    <div className="title-col grid align-center justify-center"><span>Item</span></div>

                    {labels.map((label, idx) => (
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
                        boardId={boardId}
                        groupId={group.id}
                        task={task}
                        cmpsOrder={cmpsOrder}
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
                            value={"+Add Item"}
                            tooltip='Click to Edit'
                            tooltipPosition="bottom"
                            customColor="#323338"
                        // onBlur={(ev) => onSaveBoard({ key: 'TaskTitle', value: ev.target.value, boardId, taskId })}
                        // onKeyDown={handleKeyPress}
                        />
                    </div>
                </div>

            </section>
        </section>
    )
}