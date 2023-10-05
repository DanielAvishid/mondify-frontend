import { EditableHeading, IconButton } from "monday-ui-react-core"
import { AddUpdate } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useNavigate } from "react-router"

export function TaskTitle({ boardId, title, taskId, onSaveBoard }) {

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onSaveBoard({ boardId, taskId, key: 'TaskTitle', value: ev.target.value })
            ev.target.blur()
        }
    }

    const navigate = useNavigate()
    return (
        <div className="title-cell title-col grid align-center">
            <div>
                <EditableHeading
                    type={EditableHeading.types.h5}
                    value={title}
                    tooltip='Click to Edit'
                    tooltipPosition="bottom"
                    customColor="#323338"
                    onBlur={(ev) => onSaveBoard({ key: 'TaskTitle', value: ev.target.value, boardId, taskId })}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <div className="grid align-center justify-center">
                <IconButton
                    icon={AddUpdate}
                    kind={IconButton.kinds.TERTIARY}
                    ariaLabel="Start conversation"
                    size={IconButton.sizes.SMALL}
                    onClick={() => navigate(`task/${taskId}`)} />
            </div>
        </div>
    )
}