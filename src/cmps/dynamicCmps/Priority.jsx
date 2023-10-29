import { useRef } from "react";
import { utilService } from "../../services/util.service"
import { useClickOutside } from "../../hooks/useClickOutside ";

export function Priority({ info }) {
    const priorityCell = useRef();
    const { isFocus, setIsFocus } = useClickOutside(priorityCell);
    // const { isFocus: isModalOpen, setIsFocus: setIsModalOpen } = useClickOutside(statusCell);

    const priority = info
    const priorityClass = utilService.formatString(priority)

    const onClickPriorityCell = () => {
        setIsFocus(true)
        // setIsModalOpen(!isModalOpen)
    }

    return (
        <td
            className={`task-item priority priority-col grid align-center justify-center ${priorityClass} ${isFocus ? 'focus' : ''}`}
            ref={priorityCell}
            onClick={onClickPriorityCell}
        >
            <span>{priority}</span>
            {/* {isModalOpen && <ENTER YOUR MODAL HERE/>} */}
        </td>
    )
}