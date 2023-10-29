import { utilService } from "../../services/util.service"

export function Priority({ info }) {
    const priority = info
    const priorityClass = utilService.formatString(priority)

    return (
        <td className={`task-item priority priority-col grid align-center justify-center ${priorityClass}`}>
            <span>{priority}</span>
        </td>
    )
}