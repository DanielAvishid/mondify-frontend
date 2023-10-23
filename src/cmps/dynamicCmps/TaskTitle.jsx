import { Counter, EditableHeading, Icon, IconButton } from "monday-ui-react-core"
import { AddUpdate, Update } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useNavigate } from "react-router"

export function TaskTitle({ boardId, task, onSaveBoard }) {
    const { id: taskId, updates, title } = task

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onSaveBoard({ boardId, taskId, key: 'title', value: ev.target.value })
            ev.target.blur()
        }
    }

    const navigate = useNavigate()
    return (
        <div className="title-cell title-col grid align-center">
            <div>
                <EditableHeading
                    type={EditableHeading.types.h6}
                    value={title}
                    tooltip='Click to Edit'
                    tooltipPosition="bottom"
                    customColor="#323338"
                    onBlur={(ev) => onSaveBoard({ key: 'title', value: ev.target.value, boardId, taskId })}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <div className="chat-cell grid align-center justify-center">
                {(!updates || updates.length < 1) ?
                    <Icon icon={AddUpdate} iconSize="22" ariaLabel="Start conversation" onClick={() => navigate(`task/${taskId}`)} /> :
                    <div onClick={() => navigate(`task/${taskId}`)}>
                        <Icon
                            className="updates-icon"
                            icon={Update}
                            iconSize="22"
                            ariaLabel="Start conversation" />
                        <Counter count={updates.length} className="updates-counter" />
                    </div>}
            </div>
        </div>
    )
}