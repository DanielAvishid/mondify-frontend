import { Counter, EditableHeading, Icon, IconButton } from "monday-ui-react-core"
import { AddUpdate, Update, DropdownChevronRight, Open } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
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
            <div className="title-name flex align-center justify-between">
                <div className="flex">
                    <div className="collapse flex justify-center align-center ">
                        <Icon
                            icon={DropdownChevronRight}
                            iconSize="22"
                            ariaLabel="Expand subitems"
                        />
                    </div>
                    <div className="flex justify-center align-center">
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
                </div>
                <div className="open-details-container flex justify-center align-center" onClick={() => navigate(`task/${taskId}`)}>
                    <Icon
                        icon={Open}
                        iconSize="20"
                        ariaLabel="Open item page"
                    />
                    <span>Open</span>
                </div>
            </div>
            <div className="chat-cell grid align-center justify-center">
                {(!updates || updates.length < 1) ?
                    <Icon icon={AddUpdate} iconSize="22" ariaLabel="Start conversation" onClick={() => navigate(`task/${taskId}`)} /> :
                    <div onClick={() => navigate(`task/${taskId}`)}>
                        <Icon
                            icon={Update}
                            iconSize="22"
                            ariaLabel="Start conversation" />
                        <Counter count={updates.length} className="updates-counter" />
                    </div>}
            </div>
        </div>
    )
}