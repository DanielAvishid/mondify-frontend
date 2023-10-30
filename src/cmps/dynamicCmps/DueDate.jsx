import { utilService } from "../../services/util.service";
import { PiWarningCircleFill, PiCheckCircleFill } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { Icon } from "monday-ui-react-core";
import { Calendar } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"


export function DueDate({ labelId, board, onSaveBoard, cmpType, info, setIsTaskFocus, task, group }) {
    const dueDate = (info) ? utilService.formatDateFromTimestamp(info) : null

    const statusLabels = board.statusLabels
    const taskStatus = task.status

    const isDone = statusLabels.some(label => label.color === '#00c875' && label.id === taskStatus);

    const currentDate = new Date();
    const isPastDate = info ? new Date(info) < currentDate : false;

    return (
        <td className="due-date date-col flex align-center justify-center">
            {info ?
                <div className="inner-container flex align-center justify-center">
                    {isPastDate ?
                        <PiWarningCircleFill className="sign warning" /> :
                        <PiCheckCircleFill className="sign check" />
                    }
                    <span className={`${isDone ? 'done' : ''}`}>{dueDate}</span>
                    <AiOutlineClose className="remove-date" onClick={() => onSaveBoard({ board, taskId: task.id, key: "date", value: null })} />
                </div>
                :
                <div className="empty-inner-container flex align-center">
                    <MdAddCircle className="add-date" />
                    <Icon icon={Calendar} title="Calendar" iconSize={22} />
                </div>
            }
        </td >
    );
}