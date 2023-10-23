import { useState } from "react";
import { utilService } from "../../services/util.service";

export function DueDate({ info, board, onSaveBoard }) {
    const { text, percentage } = utilService.getDateToShow(info)
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div className="dueDate-cell dueDate-col grid align-center justify-center">

            <div
                style={{ background: `linear-gradient(90deg, rgb(87,155,252) ${+percentage}%, rgb(51,51,51) ${0}%)` }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inner-container"
            >
                {info.length ? (
                    <span>{hovered ? `${utilService.calculateDaysDifference(info)}d` : text}</span>
                ) : (
                    <span>{hovered ? `Set Dates` : '-'}</span>
                )}
            </div>


            {/* {info.length ? (
                <div
                    style={{ background: `linear-gradient(90deg, rgb(87,155,252) ${+percentage}%, rgb(51,51,51) ${0}%)` }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="inner-container"
                >
                    <span>{hovered ? `${utilService.calculateDaysDifference(info)}d` : text}</span>
                </div>
            ) : (
                <div
                    className="inner-container"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <span>{hovered ? `Set Dates` : '-'}</span>
                </div>
            )} */}
        </div>
    )
}