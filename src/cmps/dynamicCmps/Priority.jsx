import { utilService } from "../../services/util.service"

export function Priority({ info }) {
    const priority = info
    const priorityClass = utilService.formatString(priority)

    return (
        <div className={`task-item priority-cell priority-col grid align-center justify-center ${priorityClass}`}>
            <span>{priority}</span>
        </div>
    )
}