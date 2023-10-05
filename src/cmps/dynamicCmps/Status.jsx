import { utilService } from "../../services/util.service"

export function Status({ info }) {
    const status = info
    const statusClass = utilService.formatString(status)

    return (
        <div className={`status-cell status-col grid align-center justify-center ${statusClass}`}>
            <span>{status}</span>
        </div>
    )
}