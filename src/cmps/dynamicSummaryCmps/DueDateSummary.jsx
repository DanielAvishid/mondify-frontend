import { useState } from "react"
import { utilService } from "../../services/util.service"

export function DueDateSummary({ group }) {

    const [isHover, setIsHover] = useState(false)

    const dueDates = group.tasks.map(task => task.dueDate)
    const flattenedDueDates = [].concat(...dueDates)
    const minDueDate = Math.min(...flattenedDueDates)
    const maxDueDate = Math.max(...flattenedDueDates)
    const finalDates = [minDueDate, maxDueDate]
    const { text, percentage } = utilService.getDateToShow(finalDates)

    const defaultGroupBgc = group.style.backgroundColor
    const darkerGroupBgc = utilService.darkenColor(defaultGroupBgc, 0.20)
    const bgcToShow = isHover ? darkerGroupBgc : defaultGroupBgc

    const backgroundStyle = {
        background: `linear-gradient(90deg, ${bgcToShow} ${+percentage}%, var(--inverted-color-background) 0%)`
    }

    return (
        <div
            style={backgroundStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="inner-container"
        // onClick={() => setIsModalOpen(!isModalOpen)}
        >
            {finalDates.length ? (
                <span>{isHover ? `${utilService.calculateDaysDifference(finalDates)}d` : text}</span>
            ) : (
                <span>{isHover ? `Set Dates` : '-'}</span>
            )}
        </div>
    )
}