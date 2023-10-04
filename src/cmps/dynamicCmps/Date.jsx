import { utilService } from "../../services/util.service";

export function DateCmp({ info }) {
    const date = utilService.getDateToShow(info)

    return (
        <div>
            <div>
                <span>{date}</span>
            </div>
        </div>
    )
}