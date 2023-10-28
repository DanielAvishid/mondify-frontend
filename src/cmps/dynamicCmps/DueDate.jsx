import { useState } from "react";
import { utilService } from "../../services/util.service";
import { AiOutlineClose } from "react-icons/ai";
import { DueDateModal } from "../dynamicModalCmps/DueDateModal";

export function DueDate({ info, task, board, group, onSaveBoard }) {
    const { text, percentage } = utilService.getDateToShow(info)
    const [isHover, setIsHover] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newDate, setNewDate] = useState(new Date())

    const defaultGroupBgc = group.style.backgroundColor
    const darkerGroupBgc = utilService.darkenColor(defaultGroupBgc, 0.15)
    const bgcToShow = isHover ? darkerGroupBgc : defaultGroupBgc



    const backgroundStyle = (info.length) ? {
        background: `linear-gradient(90deg, ${bgcToShow} ${+percentage}%, var(--inverted-color-background) 0%)`
    } : {}


    const handleDatePick = (date) => {
        console.log('date', date);
        setNewDate(date)
        const startDate = (date.startDate) ? date.startDate._d.getTime() : null
        const endDate = (date.endDate) ? date.endDate._d.getTime() : null
        if (startDate && endDate) {
            onSaveBoard({ board, taskId: task.id, key: "dueDate", value: [startDate, endDate] })
        }
    }

    return (
        <td className="task-item dueDate-cell dueDate-col grid align-center justify-center">
            {info.length > 0 && < AiOutlineClose className="remove-date" onClick={() => onSaveBoard({ board, taskId: task.id, key: "dueDate", value: [] })} />}
            <div
                style={backgroundStyle}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="inner-container"
                onClick={() => setIsModalOpen(!isModalOpen)}
            >
                {info.length ? (
                    <span>{isHover ? `${utilService.calculateDaysDifference(info)}d` : text}</span>
                ) : (
                    <span>{isHover ? `Set Dates` : '-'}</span>
                )}

            </div>

            {isModalOpen && <DueDateModal />}
        </td>
    )
}