import { utilService } from "../../services/util.service";
import { PiWarningCircleFill } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";

export function DueDate({ labelId, board, onSaveBoard, cmpType, info, setIsTaskFocus, task, group }) {
    const dueDate = (info) ? utilService.formatDateFromTimestamp(info) : null

    const statusLabels = board.statusLabels
    const taskStatus = task.status

    const isDone = statusLabels.some(label => label.color === '#00c875' && label.id === taskStatus);

    return (
        <td className="due-date date-col flex align-center justify-center">
            {info &&
                <div className="inner-container flex align-center justify-center">
                    <PiWarningCircleFill className="warning" />
                    <span className={`${isDone ? 'done' : ''}`}>{dueDate}</span>
                    <AiOutlineClose className="remove-date" />
                </div>
            }
        </td >
    );
}