import { useRef, useState } from "react";
import { utilService } from "../../services/util.service";
import { AiOutlineClose } from "react-icons/ai";
import { TimelineModal } from "../dynamicModalCmps/TimelineModal";
import { useClickOutside } from "../../hooks/useClickOutside";

export function Timeline({ info, task, board, group, onSaveBoard, setIsTaskFocus }) {

    const [isHover, setIsHover] = useState(false)
    const [newDate, setNewDate] = useState(new Date())

    const timelineCell = useRef();
    const { isFocus, setIsFocus } = useClickOutside(timelineCell);
    const { isFocus: isModalOpen, setIsFocus: setIsModalOpen } = useClickOutside(timelineCell);

    const defaultGroupBgc = group.style.backgroundColor
    const darkerGroupBgc = utilService.darkenColor(defaultGroupBgc, 0.15)
    const bgcToShow = isHover ? darkerGroupBgc : defaultGroupBgc

    const { text, percentage } = utilService.getDateToShow(info)
    const backgroundStyle = (info.length) ? {
        background: `linear-gradient(90deg, ${bgcToShow} ${+percentage}%, var(--inverted-color-background) 0%)`
    } : {}

    const handleDatePick = (date) => {
        console.log('date', date);
        setNewDate(date)
        const startDate = (date.startDate) ? date.startDate._d.getTime() : null
        const endDate = (date.endDate) ? date.endDate._d.getTime() : null
        if (startDate && endDate) {
            onSaveBoard({ board, taskId: task.id, key: "timeline", value: [startDate, endDate] })
        }
    }

    const onClickTimelineCell = () => {
        setIsTaskFocus(true)
        setIsFocus(true)
        setIsModalOpen(!isModalOpen)
    }

    return (
        <td
            className={`task-item timeline timeline-col grid align-center justify-center  ${isFocus ? 'focus' : ''}`}
            ref={timelineCell}
        >
            {info.length > 0 && < AiOutlineClose className="remove-date" onClick={() => onSaveBoard({ board, taskId: task.id, key: "timeline", value: [] })} />}
            <div
                style={backgroundStyle}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="inner-container"
                onClick={onClickTimelineCell}
            >
                {info.length ? (
                    <span>{isHover ? `${utilService.calculateDaysDifference(info)}d` : text}</span>
                ) : (
                    <span>{isHover ? `Set Dates` : '-'}</span>
                )}

            </div>

            {isModalOpen && <TimelineModal newDate={newDate} handleDatePick={handleDatePick} />}
        </td>
    )
}