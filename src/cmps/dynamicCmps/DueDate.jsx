import { utilService } from "../../services/util.service";

export function DueDate({ info, board, onSaveBoard }) {
    const { text, percentage } = utilService.getDateToShow(info)

    return (
        <div className="dueDate-cell dueDate-col grid align-center justify-center">
            <div style={{ background: `linear-gradient(90deg, rgb(87,155,252) ${+percentage}%, rgb(51,51,51) ${0}%)` }}>
                <span>{text}</span>
            </div>
        </div>
    )
}