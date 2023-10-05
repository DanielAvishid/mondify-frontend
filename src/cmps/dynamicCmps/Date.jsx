import { utilService } from "../../services/util.service";

export function DateCmp({ info }) {
    const date = utilService.getDateToShow(info)

    return (
        <div className="timeline-cell timeline-col grid align-center justify-center">
            <div>
                <span>{date}</span>
            </div>
        </div>
    )
}