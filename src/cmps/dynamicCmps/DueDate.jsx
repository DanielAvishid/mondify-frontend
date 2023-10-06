import { utilService } from "../../services/util.service";

export function DueDate({ info }) {
    const date = utilService.getDateToShow(info)

    return (
        <div className="due-date-cell due-date-col grid align-center justify-center">
            <div>
                <span>{date}</span>
            </div>
        </div>
    )
}