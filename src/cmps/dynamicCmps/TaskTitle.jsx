import { Checkbox, Counter, EditableHeading, Icon, IconButton } from "monday-ui-react-core"
import { AddUpdate, Update, DropdownChevronRight, Open } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

export function TaskTitle({ boardId, task, onSaveBoard, isChecked, handleCheckboxChange }) {

    const navigate = useNavigate()
    const [isFocus, setIsFocus] = useState(false)

    useEffect(() => {
        // Add a document-level event listener for clicks
        document.addEventListener('click', handleDocumentClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleDocumentClick = (e) => {
        if (!e.target.closest('.task-title')) {
            // Clicked outside of the title-cell, so set isFocus to false
            setIsFocus(false);
        }
    };

    const { id: taskId, updates, title } = task

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onSaveBoard({ boardId, taskId, key: 'title', value: ev.target.value })
            ev.target.blur()
        }
    }

    return (
        <td
            className={`task-item task-title title-col flex align-center ${isFocus ? 'focus' : ''}`}
            onClick={() => setIsFocus(true)}
        >
            <div className="checkbox flex align-center justify-center">
                <Checkbox checked={isChecked} onChange={() => handleCheckboxChange(task.id)} />
            </div>
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
            <div className="chat-cell flex align-center justify-center" onClick={() => navigate(`task/${taskId}`)}>
                {(!updates || updates.length < 1) ?
                    <Icon icon={AddUpdate} iconSize="22" ariaLabel="Start conversation" /> :
                    <>
                        <Icon icon={Update} iconSize="22" ariaLabel="Add to conversation" className="update-icon" />
                        <span className="updates-counter flex align-center justify-center">{updates.length}</span>
                        {/* <Counter count={updates.length} size={Counter.sizes.SMALL} className="storybook-counter_counter-position-bot updates-counter" /> */}
                    </>}
            </div>
        </td>
    )
}