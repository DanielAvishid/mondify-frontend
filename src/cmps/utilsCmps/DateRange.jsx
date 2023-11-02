import { utilService } from "../../services/util.service"

export function DateRange({ info }) {
    console.log(info);
    const { text, percentage } = utilService.getDateToShow(info)

    return (
        <div className="date-container">
            <span>{text}</span>
        </div>
    )
}