import { utilService } from "../../services/util.service"

export function DateRange({ value, isNew }) {
    const { text, percentage } = utilService.getDateToShow(value)

    return (
        <div className={`date-range relative flex align-center justify-center ${text ? (isNew ? 'new-val' : 'prev-val') : ''}`}>
            <span className="ellipsis-text">{text ? text : '-'}</span>
        </div>
    )
}